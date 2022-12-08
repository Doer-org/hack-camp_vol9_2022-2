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
	NewRoom(id string, name string, max_member int, member_count int) (*entity.Room, error)
	GetRoomOfID(id string) (*entity.Room, error)
	DeleteAllRoom() error
	DeleteRoomOfID(id string) error
}

func NewRoomUsecase(repo repository.IRoomRepository) IRoomUsecase {
	return &RoomUsecase{
		repo: repo,
	}
}

func (uc *RoomUsecase) NewRoom(id string, name string, max_member int, member_count int) (*entity.Room, error) {
	if name == "" {
		return nil, usecase_error.NameEmptyError
	}
	if max_member == 0 {
		return nil, usecase_error.MaxMemberError
	}
	if member_count == 0 {
		return nil, usecase_error.MemberCountError
	}

	id = utils.GetHashId()
	room, err := uc.repo.GetRoomOfID(id)

	if err != nil {
		return nil, err
	}

	if room.Name != "" {
		return nil, usecase_error.RoomdIdUsedError
	}

	room, err = uc.repo.NewRoom(id, name, max_member, member_count)
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
