package route

import (
	"time"

	"backend/api/controller"
	"backend/bootstrap"
	"backend/repository"
	"backend/usecase"

	"github.com/gin-gonic/gin"
)

func NewHotelRouter(env *bootstrap.Env, timeout time.Duration, group *gin.RouterGroup) {
	timeout *= 15
	hr := repository.NewHotelRepository(env.RapidAPIKey, env.RapidAPIHost)
	hc := &controller.HotelController{
		HotelUsecase: usecase.NewHotelUsecase(hr, timeout),
		Env:          env,
	}
	group.GET("/hotels/locations", hc.GetLocationSuggestions)
	group.GET("/hotels/search", hc.SearchHotels)
}
