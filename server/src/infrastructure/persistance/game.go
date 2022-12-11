package persistance

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/repository"
	db_error "github.com/Doer-org/hack-camp_vol9_2022-2/error/infrastructure"
)

var _ repository.IGameRepository = &GameRepository{}

type GameRepository struct {
	db *sql.DB
}

func NewGameRepository(db *sql.DB) *GameRepository {
	return &GameRepository{
		db: db,
	}
}

func (repo *GameRepository) CreateGame(user_id string, q_n string, q_n_i string, typo bool) (*entity.Game, error) {
	statement := "INSERT INTO Games(message, size, member_id, room_id, score, created_at) VALUES(?,?,?,?)"
	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("%v : %v", db_error.StatementError, err)
	}
	defer stmt.Close()

	Game := &entity.Game{}
	// res, err := stmt.Exec(user_id, q_n, q_n_i, typo)

	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("%v : %v", db_error.ExecError, err)
	}
	// user_id, err := res.LastInsertId()

	// if err != nil {
	// 	return nil, fmt.Errorf("%v : %v", db_error.LastInsertError, err)
	// }

	Game.UserId = user_id
	Game.QN = q_n
	Game.QNI = q_n_i
	Game.Typo = typo

	return Game, nil
}

func (repo *GameRepository) GetAllGame() ([]*entity.Game, error) {
	statement := "SELECT * FROM Games"
	stmt, err := repo.db.Prepare(statement)

	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("%v : %v", db_error.StatementError, err)
	}

	defer stmt.Close()

	var Games []*entity.Game
	rows, err := stmt.Query()

	if err != nil {
		return nil, fmt.Errorf("%v : %v", db_error.QueryrowError, err)
	}

	for rows.Next() {
		Game := &entity.Game{}
		if err := rows.Scan(
			&Game.UserId,
			&Game.QN,
			&Game.QNI,
			&Game.Typo,
		); err != nil {
			log.Println(err)
			return nil, fmt.Errorf("%v : %v", db_error.RowsScanError, err)
		}

		Games = append(Games, Game)
	}

	err = rows.Err()
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("%v : %v", db_error.RowsLoopError, err)
	}

	return Games, err
}

func (repo *GameRepository) DeleteGameOfRoomId(room_id string) error {
	statement := "DELETE FROM Games WHERE room_id = ?"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return fmt.Errorf("%v : %v", db_error.StatementError, err)
	}
	defer stmt.Close()

	_, err = stmt.Exec(room_id)

	if err != nil {
		log.Println(err)
		return fmt.Errorf("%v : %v", db_error.ExecError, err)
	}

	return nil
}
