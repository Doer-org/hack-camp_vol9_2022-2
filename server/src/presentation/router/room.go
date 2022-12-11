package router

import (
	"database/sql"

	"github.com/Doer-org/hack-camp_vol9_2022-2/infrastructure/persistance"
	"github.com/Doer-org/hack-camp_vol9_2022-2/presentation/handler"
	"github.com/Doer-org/hack-camp_vol9_2022-2/presentation/ws"
	"github.com/Doer-org/hack-camp_vol9_2022-2/usecase"
)

func (r *Router) InitRoomRouter(db *sql.DB) {
	repo := persistance.NewRoomRepository(db)
	uc := usecase.NewRoomUsecase(repo)
	h := handler.NewRoomHandler(uc)
	hubsStore := ws.NewHubsStore()
	repoRoom := persistance.NewRoomRepository(db)
	ucRoom := usecase.NewRoomUsecase(repoRoom)
	repoGame := persistance.NewGameRepository(db)
	ucGame := usecase.NewGameUsecase(repoGame)
	hWs := ws.NewRoomWsHandler(ucGame, ucRoom, hubsStore)

	g := r.Engine.Group("/room")
	g.POST("/new", h.NewRoom)
	g.GET("/:id", h.GetRoomOfID)
	g.DELETE("/:id", h.DeleteRoomOfID)

	wg := r.Engine.Group("/ws")
	wg.GET("/:room_id", hWs.ConnectWsRoom)
	wg.DELETE("/:room_id", hWs.DeleteHubOfRoomId)
}
