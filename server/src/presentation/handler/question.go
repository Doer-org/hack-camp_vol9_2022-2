package handler

import (
	"net/http"

	"github.com/Doer-org/hack-camp_vol9_2022-2/presentation/json"
	"github.com/Doer-org/hack-camp_vol9_2022-2/usecase"
	"github.com/gin-gonic/gin"
)

type QuestionHandler struct {
	uc usecase.IQuestionUsecase
}

func NewQuestionHandler(uc usecase.IQuestionUsecase) *QuestionHandler {
	return &QuestionHandler{
		uc: uc,
	}
}

func (rh *QuestionHandler) CreateQuestion(ctx *gin.Context) {
	var questionjson json.questionJson
	if err := ctx.BindJSON(&questionjson); err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}

	question := json.QuestionJsonToEntity(&questionjson)
	question, err := rh.uc.CreateQuestion(question.Id, question.Code, question.Tips, question.Language)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}

	questionJson := json.QuestionEntityToJson(question)
	ctx.JSON(
		http.StatusOK,
		gin.H{"data": questionJson},
	)

}

func (rh *QuestionHandler) GetAllMembersOfRoomID(ctx *gin.Context) {
	roomId := ctx.Param("roomId")
	member, err := rh.uc.GetAllMembersOfRoomID(roomId)

	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}

	memberJson := json.QuestionEntityToJson(member)
	ctx.JSON(
		http.StatusOK,
		gin.H{"data": memberJson},
	)

}

func (rh *QuestionHandler) DeleteAllQuestionOfRoomID(ctx *gin.Context) {
	roomId := ctx.Param("roomId")
	err := rh.uc.DeleteAllQuestionOfRoomID(roomId)

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