package entity

type Game struct {
	UserId string `json:"user_id"`
	QN     string `json:"Q_n"`
	QNI    string `json:"Q_n_i"`
	Typo   bool    `json:"typo"`
}

type Games []*Game
