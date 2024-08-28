package usecase

import (
    "context"
    "encoding/json"
    "time"

    "backend/domain"
)

type hotelUsecase struct {
    hotelRepository domain.HotelRepository
    contextTimeout  time.Duration
}

func NewHotelUsecase(hotelRepository domain.HotelRepository, timeout time.Duration) domain.HotelUsecase {
    return &hotelUsecase{
        hotelRepository: hotelRepository,
        contextTimeout:  timeout,
    }
}

func (hu *hotelUsecase) GetLocationSuggestions(c context.Context, locale, name string) ([]domain.LocationSuggestion, error) {
    ctx, cancel := context.WithTimeout(c, hu.contextTimeout)
    defer cancel()
    return hu.hotelRepository.GetLocationSuggestions(ctx, locale, name)
}

func (hu *hotelUsecase) SearchHotels(c context.Context, params domain.HotelSearchParams) (json.RawMessage, error) {
    ctx, cancel := context.WithTimeout(c, hu.contextTimeout)
    defer cancel()
    return hu.hotelRepository.SearchHotels(ctx, params)
}
