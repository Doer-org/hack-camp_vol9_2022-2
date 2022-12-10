package handler

import (
	"net/http"

	"github.com/Doer-org/hack-camp_vol9_2022-2/presentation/json"
	"github.com/Doer-org/hack-camp_vol9_2022-2/usecase"
	"github.com/gin-gonic/gin"
)

type RoomHandler struct {
	uc usecase.IRoomUsecase
}

func NewRoomHandler(uc usecase.IRoomUsecase) *RoomHandler {
	return &RoomHandler{
		uc: uc,
	}
}

func (rh *RoomHandler) NewRoom(ctx *gin.Context) {
	var roomjson json.RoomJson
	if err := ctx.BindJSON(&roomjson); err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}

	room := json.RoomJsonToEntity(&roomjson)
	room, err := rh.uc.NewRoom(room.RoomId, room.RoomName, room.MaxCount)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}

	roomJson := json.RoomEntityToJson(room)
	ctx.JSON(
		http.StatusOK,
		gin.H{"data": roomJson},
	)

}

func (rh *RoomHandler) GetRoomOfID(ctx *gin.Context) {
	id := ctx.Param("id")
	room, err := rh.uc.GetRoomOfID(id)

	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}

	roomJson := json.RoomEntityToJson(room)
	ctx.JSON(
		http.StatusOK,
		gin.H{"data": roomJson},
	)
}

func (rh *RoomHandler) DeleteRoomOfID(ctx *gin.Context) {
	id := ctx.Param("id")
	err := rh.uc.DeleteRoomOfID(id)

	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}

	ctx.JSON(
		http.StatusOK,
		gin.H{"data": "success"},
	)
}
