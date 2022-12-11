package repository

import "github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"

type IGameRepository interface {
	CreateGame(user_id string, Q_n string, Q_n_i string, typo bool) (*entity.Game, error)
	GetAllGame() ([]*entity.Game, error)
	DeleteGameOfRoomId(room_id string) error
}
