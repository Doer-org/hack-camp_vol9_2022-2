package repository

import "github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"

type IMemberRepository interface {
	CreateMember(userId string, userName string, roomId string) (*entity.Member, error)
	GetAllMembersOfRoomID(roomId string) (entity.Members, error)
	DeleteAllMembersOfRoomID(roomId string) error
}