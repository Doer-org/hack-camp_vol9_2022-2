package entity

type Member struct {
	Id     int
	Name   string
	RoomId string
}

type Members []*Member
