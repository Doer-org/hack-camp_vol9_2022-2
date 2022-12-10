package usecase

import (
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/repository"
	usecase_error "github.com/Doer-org/hack-camp_vol9_2022-2/error/usecase"
	"github.com/Doer-org/hack-camp_vol9_2022-2/utils"
)

var _ IRoomUsecase = &RoomUsecase{}

type RoomUsecase struct {
	repo repository.IRoomRepository
}

type IRoomUsecase interface {
	NewRoom(id string, name string, max_count int) (*entity.Room, error)
	GetRoomOfID(id string) (*entity.Room, error)
	DeleteAllRoom() error
	DeleteRoomOfID(id string) error
}

func NewRoomUsecase(repo repository.IRoomRepository) IRoomUsecase {
	return &RoomUsecase{
		repo: repo,
	}
}

func (uc *RoomUsecase) NewRoom(room_id string, room_name string, max_count int) (*entity.Room, error) {
	if room_name == "" {
		return nil, usecase_error.NameEmptyError
	}
	if max_count == 0 {
		return nil, usecase_error.MaxCountError
	}

	room_id = utils.GetHashId()
	room, err := uc.repo.GetRoomOfID(room_id)

	if err != nil {
		return nil, err
	}

	if room.RoomName != "" {
		return nil, usecase_error.RoomdIdUsedError
	}

	room, err = uc.repo.NewRoom(room_id, room_name, max_count)
	return room, err
}

func (uc *RoomUsecase) GetRoomOfID(id string) (*entity.Room, error) {
	room, err := uc.repo.GetRoomOfID(id)
	return room, err
}

func (uc *RoomUsecase) DeleteAllRoom() error {
	err := uc.repo.DeleteAllRoom()
	return err
}

func (uc *RoomUsecase) DeleteRoomOfID(id string) error {
	if id == "" {
		return usecase_error.IdEmptyError
	}
	err := uc.repo.DeleteRoomOfID(id)
	return err
}
