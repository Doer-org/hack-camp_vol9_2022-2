package repository

import "github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"

type IRoomRepository interface {
	NewRoom(room_id string, room_name string, max_count int) (*entity.Room, error)
	GetRoomOfID(room_id string) (*entity.Room, error)
	DeleteAllRoom() error
	DeleteRoomOfID(room_id string) error
}
