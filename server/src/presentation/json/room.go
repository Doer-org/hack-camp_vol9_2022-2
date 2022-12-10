package json

import "github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"

type RoomJson struct {
	RoomId          string `json:"room_id"`
	RoomName        string `json:"room_name"`
	MaxCount   int    `json:"max_count"`

}

type RoomsJson []RoomJson

type RoomIdJson string

func RoomEntityToJson(c *entity.Room) *RoomJson {
	return &RoomJson{
		RoomId:          c.RoomId,
		RoomName:        c.RoomName,
		MaxCount:   c.MaxCount,
	}
}

func RoomJsonToEntity(j *RoomJson) *entity.Room {
	return &entity.Room{
		RoomId:          j.RoomId,
		RoomName:        j.RoomName,
		MaxCount:   j.MaxCount,
	}
}

func RoomIdEntityToJson(roomid string) RoomIdJson {
	return RoomIdJson(roomid)
}

// json to entity
func RoomIdJsonToEntity(r RoomIdJson) string {
	return string(r)
}
