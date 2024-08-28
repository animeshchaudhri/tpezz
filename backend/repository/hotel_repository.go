package repository

import (
    "context"
    "encoding/json"
    "fmt"
    "io"
    "log"
    "net/http"
    "net/url"

    "backend/domain"
)

type hotelRepository struct {
    apiKey  string
    apiHost string
}

func NewHotelRepository(apiKey, apiHost string) domain.HotelRepository {
    return &hotelRepository{
        apiKey:  apiKey,
        apiHost: apiHost,
    }
}

func (hr *hotelRepository) GetLocationSuggestions(ctx context.Context, locale, name string) ([]domain.LocationSuggestion, error) {
    url := fmt.Sprintf("https://%s/v1/hotels/locations?locale=%s&name=%s", hr.apiHost, locale, name)

    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }

    req.Header.Add("x-rapidapi-key", hr.apiKey)
    req.Header.Add("x-rapidapi-host", hr.apiHost)

    res, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer res.Body.Close()

    body, err := io.ReadAll(res.Body)
    if err != nil {
        return nil, err
    }

    var suggestions []domain.LocationSuggestion
    err = json.Unmarshal(body, &suggestions)
    if err != nil {
        return nil, err
    }

    return suggestions, nil
}

func (hr *hotelRepository) SearchHotels(ctx context.Context, params domain.HotelSearchParams) (json.RawMessage, error) {
    baseURL := fmt.Sprintf("https://%s/v1/hotels/search", hr.apiHost)

    query := url.Values{}
    query.Set("dest_id", params.DestID)
    query.Set("dest_type", params.DestType)
    query.Set("locale", params.Locale)
    query.Set("checkin_date", params.CheckinDate)
    query.Set("checkout_date", params.CheckoutDate)
    query.Set("adults_number", params.AdultsNumber)
    query.Set("children_number", params.ChildrenNumber)
    query.Set("children_ages", params.ChildrenAges)
    query.Set("room_number", params.RoomNumber)
    query.Set("page_number", params.PageNumber)
    if params.CategoriesFilterIDs != "" {
        query.Set("categories_filter_ids", params.CategoriesFilterIDs)
    }
    query.Set("filter_by_currency", params.FilterByCurrency)
    query.Set("order_by", params.OrderBy)
    query.Set("include_adjacency", params.IncludeAdjacency)
    query.Set("units", params.Units)

    url := baseURL + "?" + query.Encode()
    log.Print(url)
    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }

    req.Header.Add("x-rapidapi-key", hr.apiKey)
    req.Header.Add("x-rapidapi-host", hr.apiHost)

    res, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer res.Body.Close()

    body, err := io.ReadAll(res.Body)
    if err != nil {
        return nil, err
    }

    return json.RawMessage(body), nil
}