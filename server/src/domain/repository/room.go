package repository

import "github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"

type IRoomRepository interface {
	NewRoom(id string, name string, max_member int, member_count int) (*entity.Room, error)
	GetRoomOfID(id string) (*entity.Room, error)
	DeleteAllRoom() error
	DeleteRoomOfID(id string) error
}