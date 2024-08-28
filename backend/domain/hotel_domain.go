package domain

import (
    "context"
    "encoding/json"
)

type LocationSuggestion struct {
    Type        string   `json:"type"`
    NrHotels    int      `json:"nr_hotels"`
    Timezone    string   `json:"timezone"`
    DestType    string   `json:"dest_type"`
    CityName    string   `json:"city_name"`
    CC1         string   `json:"cc1"`
    ImageURL    string   `json:"image_url"`
    LC          string   `json:"lc"`
    Region      string   `json:"region"`
    Roundtrip   string   `json:"roundtrip"`
    DestID      string   `json:"dest_id"`
    Country     string   `json:"country"`
    Latitude    float64  `json:"latitude"`
    Name        string   `json:"name"`
    CityUfi     *int     `json:"city_ufi"`
    RTL         int      `json:"rtl"`
    Hotels      int      `json:"hotels"`
    BMaxLosData struct {
        HasExtendedLos int    `json:"has_extended_los"`
        Experiment     string `json:"experiment"`
        IsFullon       int    `json:"is_fullon"`
        DefaultLos     int    `json:"default_los"`
        MaxAllowedLos  int    `json:"max_allowed_los"`
        ExtendedLos    int    `json:"extended_los"`
    } `json:"b_max_los_data"`
    Label      string  `json:"label"`
    Longitude  float64 `json:"longitude"`
}

type HotelSearchRequest struct {
    DestID              string `form:"dest_id" binding:"required"`
    DestType            string `form:"dest_type" binding:"required"`
    Locale              string `form:"locale" binding:"required"`
    CheckinDate         string `form:"checkin_date" binding:"required"`
    CheckoutDate        string `form:"checkout_date" binding:"required"`
    AdultsNumber        string `form:"adults_number" binding:"required"`
    ChildrenNumber      string `form:"children_number"`
    ChildrenAges        string `form:"children_ages"`
    RoomNumber          string `form:"room_number" binding:"required"`
    CategoriesFilterIDs string `form:"categories_filter_ids"`
}

type HotelSearchParams struct {
    DestID              string
    DestType            string
    Locale              string
    CheckinDate         string
    CheckoutDate        string
    AdultsNumber        string
    ChildrenNumber      string
    ChildrenAges        string
    RoomNumber          string
    PageNumber          string
    CategoriesFilterIDs string
    FilterByCurrency    string
    OrderBy             string
    IncludeAdjacency    string
    Units               string
}


type HotelRepository interface {
    GetLocationSuggestions(ctx context.Context, locale, name string) ([]LocationSuggestion, error)
    SearchHotels(ctx context.Context, params HotelSearchParams) (json.RawMessage, error)
}

type HotelUsecase interface {
    GetLocationSuggestions(ctx context.Context, locale, name string) ([]LocationSuggestion, error)
    SearchHotels(ctx context.Context, params HotelSearchParams) (json.RawMessage, error)
}
