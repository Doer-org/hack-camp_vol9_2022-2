package router

import (
	"database/sql"

	"github.com/Doer-org/hack-camp_vol9_2022-2/infrastructure/persistance"
	"github.com/Doer-org/hack-camp_vol9_2022-2/presentation/handler"
	"github.com/Doer-org/hack-camp_vol9_2022-2/usecase"
)

func (r Router) InitMemberRouter(db *sql.DB) {
	repo := persistance.NewMemberRepository(db)
	uc := usecase.NewMemberUsecase(repo)
	h := handler.NewMemberHandler(uc)

	g := r.Engine.Group("/member")
	g.POST("/new", h.CreateMember)
	g.GET("/room/:roomId", h.GetAllMembersOfRoomID)
	g.DELETE("/room/:roomId", h.DeleteAllMembersOfRoomID)
}
