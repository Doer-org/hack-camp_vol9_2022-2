package json

import "github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"

type MemberJson struct {
	Name   string `json:"name"`
	RoomId string `json:"room_id"`
}

type MembersJson []MemberJson

type MemberIdJson string

func MemberEntityToJson(c *entity.Member) *MemberJson {
	return &MemberJson{
		Name:   c.Name,
		RoomId: c.RoomId,
	}
}

func MembersEntityToJson(c entity.Members) *MembersJson {
	var MembersJson MembersJson
	for _, member := range c {
		MembersJson = append(MembersJson, *MemberEntityToJson(member))
	}

	return &MembersJson
}

func MemberJsonToEntity(j *MemberJson) *entity.Member {
	return &entity.Member{
		Name:   j.Name,
		RoomId: j.RoomId,
	}
}
