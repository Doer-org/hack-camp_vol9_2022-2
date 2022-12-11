package usecase

import (
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/repository"
	usecase_error "github.com/Doer-org/hack-camp_vol9_2022-2/error/usecase"
)

var _ IGameUsecase = &GameUsecase{}

type GameUsecase struct {
	repo repository.IGameRepository
}

type IGameUsecase interface {
	CreateGame(user_id string, q_n string, q_n_i string, typo bool) (*entity.Game, error)
	GetAllGame() ([]*entity.Game, error)
	DeleteGameOfRoomId(room_id string) error
}

func NewGameUsecase(repo repository.IGameRepository) IGameUsecase {
	return &GameUsecase{
		repo: repo,
	}
}

func (pu *GameUsecase) CreateGame(user_id string, q_n string, q_n_i string, typo bool) (*entity.Game, error) {

	// if err != nil {
	// 	return nil, usecase_error.RoomIdEmptyError
	// }

	Game, err := pu.repo.CreateGame(user_id, q_n, q_n_i, typo)
	return Game, err
}

func (pu *GameUsecase) GetAllGame() ([]*entity.Game, error) {
	Game, err := pu.repo.GetAllGame()
	return Game, err
}

func (pu *GameUsecase) DeleteGameOfRoomId(room_id string) error {
	if room_id == "" {
		return usecase_error.RoomIdEmptyError
	}

	err := pu.repo.DeleteGameOfRoomId(room_id)
	return err
}
