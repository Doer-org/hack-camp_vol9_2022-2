package json

import (
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"
)

type GameJson struct {
	UserId string `json:"user_id"`
	QN     string `json:"Q_n"`
	QNI    string `json:"Q_n_i"`
	Typo   bool    `json:"typo"`
}

type GamesJson []RoomJson

func GameEntityToJson(c *entity.Game) *GameJson {
	return &GameJson{
		UserId: c.UserId,
		QN:     c.QN,
		QNI:    c.QNI,
		Typo:   c.Typo,
	}
}

func GameJsonToEntity(j *GameJson) *entity.Game {
	return &entity.Game{
		UserId: j.UserId,
		QN:     j.QN,
		QNI:    j.QNI,
		Typo:   j.Typo,
	}
}
