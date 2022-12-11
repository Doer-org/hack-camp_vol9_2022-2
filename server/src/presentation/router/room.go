package router

import (
	"database/sql"

	"github.com/Doer-org/hack-camp_vol9_2022-2/infrastructure/persistance"
	"github.com/Doer-org/hack-camp_vol9_2022-2/presentation/handler"
	"github.com/Doer-org/hack-camp_vol9_2022-2/usecase"
)

func (r *Router) InitRoomRouter(db *sql.DB) {
	repo := persistance.NewRoomRepository(db)
	uc := usecase.NewRoomUsecase(repo)
	h := handler.NewRoomHandler(uc)

	g := r.Engine.Group("/room")
	g.POST("/create", h.NewRoom)
	g.GET("/:id", h.GetRoomOfID)
	g.DELETE("/:id", h.DeleteRoomOfID)
}