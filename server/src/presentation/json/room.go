package json

import "github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"

type RoomJson struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	MaxMember   int    `json:"max_member"`
	MemberCount int    `json:"member_count"`
}

type RoomsJson []RoomJson

type RoomIdJson string

func RoomEntityToJson(c *entity.Room) *RoomJson {
	return &RoomJson{
		Id:          c.Id,
		Name:        c.Name,
		MaxMember:   c.MaxMember,
		MemberCount: c.MemberCount,
	}
}

func RoomJsonToEntity(j *RoomJson) *entity.Room {
	return &entity.Room{
		Id:          j.Id,
		Name:        j.Name,
		MaxMember:   j.MaxMember,
		MemberCount: j.MemberCount,
	}
}

func RoomIdEntityToJson(roomid string) RoomIdJson {
	return RoomIdJson(roomid)
}

// json to entity
func RoomIdJsonToEntity(r RoomIdJson) string {
	return string(r)
}

