package usecase

import (
	"github.com/Doer-org/hack-camp_vol9_2022-1/domain/entity"
	"github.com/Doer-org/hack-camp_vol9_2022-1/domain/repository"
	usecase_error "github.com/Doer-org/hack-camp_vol9_2022-1/error/usecase"
	"github.com/Doer-org/hack-camp_vol9_2022-1/utils"
)

var _ IRoomUsecase = &RoomUsecase{}

type RoomUsecase struct {
	repo repository.IRoomRepository
}

type IRoomUsecase interface {
	NewRoom(id string, name string) (*entity.Room, error)
	GetRoomOfID(id string) (*entity.Room, error)
	DeleteAllRoom() error
}

func NewRoomUsecase(repo repository.IRoomRepository) IRoomUsecase {
	return &RoomUsecase{
		repo: repo,
	}
}

func (uc RoomUsecase) NewRoom(id string, name string) (*entity.Room, error) {
	if name == "" {
		return nil, usecase_error.NameEmptyError
	}

	id = utils.GetHashId()
	room, err := uc.repo.GetRoomOfID(id)

	if err != nil {
		return nil, err
	}

	if room.Name != "" {
		return nil, usecase_error.RoomdIdUsedError
	}

	room, err = uc.repo.NewRoom(id, name)
	return room, err
}

func (uc RoomUsecase) GetRoomOfID(id string) (*entity.Room, error) {
	room, err := uc.repo.GetRoomOfID(id)
	return room, err
}

func (uc RoomUsecase) DeleteAllRoom() error {
	err := uc.repo.DeleteAllRoom()
	return err
}