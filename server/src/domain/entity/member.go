package entity

type Member struct {
	UserId     string
	UserName   string
	RoomId string
}

type Members []*Member