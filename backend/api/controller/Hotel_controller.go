package controller

import (
    "net/http"

    "backend/bootstrap"
    "backend/domain"

    "github.com/gin-gonic/gin"
)

type HotelController struct {
    HotelUsecase domain.HotelUsecase
    Env          *bootstrap.Env
}

func (hc *HotelController) GetLocationSuggestions(c *gin.Context) {
    locale := c.Query("locale")
    name := c.Query("name")

    if locale == "" || name == "" {
        c.JSON(http.StatusBadRequest, domain.ErrorResponse{Message: "locale and name are required"})
        return
    }

    suggestions, err := hc.HotelUsecase.GetLocationSuggestions(c, locale, name)
    if err != nil {
        c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: err.Error()})
        return
    }

    c.JSON(http.StatusOK, suggestions)
}

func (hc *HotelController) SearchHotels(c *gin.Context) {
    var request domain.HotelSearchRequest

    if err := c.ShouldBindQuery(&request); err != nil {
        c.JSON(http.StatusBadRequest, domain.ErrorResponse{Message: err.Error()})
        return
    }

    searchParams := domain.HotelSearchParams{
        DestID:              request.DestID,
        DestType:            request.DestType,
        Locale:              request.Locale,
        CheckinDate:         request.CheckinDate,
        CheckoutDate:        request.CheckoutDate,
        AdultsNumber:        request.AdultsNumber,
        ChildrenNumber:      request.ChildrenNumber,
        ChildrenAges:        request.ChildrenAges,
        RoomNumber:          request.RoomNumber,
        PageNumber:          "0",
        CategoriesFilterIDs: request.CategoriesFilterIDs,
        FilterByCurrency:    "INR",
        OrderBy:             "popularity",
        IncludeAdjacency:    "true",
        Units:               "metric",
    }

    rawJSON, err := hc.HotelUsecase.SearchHotels(c, searchParams)
    if err != nil {
        c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: err.Error()})
        return
    }

    c.Data(http.StatusOK, "application/json", rawJSON)
}