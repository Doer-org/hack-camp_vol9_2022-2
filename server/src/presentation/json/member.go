package json

import "github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"

type MemberJson struct {
	UserId   string `json:"user_id"`
	UserName string `json:"user_name"`
	RoomId   string `json:"room_id"`
}

type MembersJson []MemberJson

type MemberIdJson string

func MemberEntityToJson(c *entity.Member) *MemberJson {
	return &MemberJson{
		UserId: c.UserId,
		UserName: c.UserName,
		RoomId:   c.RoomId,
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
		UserName:   j.UserName,
		RoomId: j.RoomId,
	}
}
