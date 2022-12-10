package usecase

import (
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/repository"
	usecase_error "github.com/Doer-org/hack-camp_vol9_2022-2/error/usecase"
	"github.com/Doer-org/hack-camp_vol9_2022-2/utils"
)

var _ IMemberUsecase = &MemberUsecase{}

type MemberUsecase struct {
	repo repository.IMemberRepository
}

type IMemberUsecase interface {
	CreateMember(userId string, userName string, roomId string) (*entity.Member, error)
	GetAllMembersOfRoomID(roomId string) (entity.Members, error)
	DeleteAllMembersOfRoomID(roomId string) error
}

func NewMemberUsecase(repo repository.IMemberRepository) IMemberUsecase {
	return &MemberUsecase{
		repo: repo,
	}
}

func (uc *MemberUsecase) CreateMember(userId string, userName string, roomId string) (*entity.Member, error) {
	if userName == "" {
		return nil, usecase_error.NameEmptyError
	}
	if roomId == "" {
		return nil, usecase_error.RoomdIdEmptyError
	}
	userId = utils.GetHashId()
	member, err := uc.repo.CreateMember(userId, userName, roomId)
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
