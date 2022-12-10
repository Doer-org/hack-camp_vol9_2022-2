package usecase

import (
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/repository"
	usecase_error "github.com/Doer-org/hack-camp_vol9_2022-2/error/usecase"
)

var _ IMemberUsecase = &MemberUsecase{}

type MemberUsecase struct {
	repo repository.IMemberRepository
}

type IMemberUsecase interface {
	CreateMember(name string, roomId string) (*entity.Member, error)
	GetAllMembersOfRoomID(roomId string) (entity.Members, error)
	DeleteAllMembersOfRoomID(roomId string) error
}

func NewMemberUsecase(repo repository.IMemberRepository) IMemberUsecase {
	return &MemberUsecase{
		repo: repo,
	}
}

func (uc *MemberUsecase) CreateMember(name string, roomId string) (*entity.Member, error) {
	if name == "" {
		return nil, usecase_error.NameEmptyError
	}
	if roomId == "" {
		return nil, usecase_error.RoomdIdEmptyError
	}

	member, err := uc.repo.CreateMember(name, roomId)
	return member, err
}

func (uc *MemberUsecase) GetAllMembersOfRoomID(roomId string) (entity.Members, error) {
	if roomId == "" {
		return nil, usecase_error.RoomIdEmptyError
	}
	member, err := uc.repo.GetAllMembersOfRoomID(roomId)
	return member, err
}

func (uc *MemberUsecase) DeleteAllMembersOfRoomID(roomId string) error {
	if roomId == "" {
		return usecase_error.RoomIdEmptyError
	}
	err := uc.repo.DeleteAllMembersOfRoomID(roomId)
	return err
}
