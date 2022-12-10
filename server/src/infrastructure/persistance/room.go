package persistance

import (
	"database/sql"
	"log"

	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/repository"
	db_error "github.com/Doer-org/hack-camp_vol9_2022-2/error/infrastructure"
)

var _ repository.IRoomRepository = &RoomRepository{}

type RoomRepository struct {
	db *sql.DB
}

func NewRoomRepository(db *sql.DB) *RoomRepository {
	return &RoomRepository{
		db: db,
	}
}

func (repo *RoomRepository) NewRoom(room_id string, room_name string, max_count int) (*entity.Room, error) {
	statement := "INSERT INTO rooms VALUES(?,?,?)"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return nil, db_error.StatementError
	}
	defer stmt.Close()

	room := &entity.Room{}
	_, err = stmt.Exec(room_id, room_name, max_count)

	room.RoomId = room_id
	room.MaxCount = max_count
	room.RoomName = room_name

	if err != nil {
		log.Println(err)
		return nil, db_error.ExecError
	}

	return room, nil
}
func (repo *RoomRepository) GetRoomOfID(room_id string) (*entity.Room, error) {
	statement := "SELECT * FROM rooms WHERE room_id = ?"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return nil, db_error.StatementError
	}
	defer stmt.Close()

	room := &entity.Room{}
	err = stmt.QueryRow(room_id).Scan(&room.RoomId, &room.RoomName, &room.MaxCount)

	if err != nil && err != sql.ErrNoRows {
		log.Println(err)
		return nil, db_error.QueryrowError
	}

	return room, nil
}

func (repo *RoomRepository) DeleteAllRoom() error {
	statement := "DELETE FROM rooms"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return db_error.StatementError
	}
	defer stmt.Close()

	_, err = stmt.Exec()

	if err != nil {
		log.Println(err)
		return db_error.ExecError
	}

	return nil
}

func (repo *RoomRepository) DeleteRoomOfID(room_id string) error {
	statement := "DELETE FROM rooms WHERE room_id = ?"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return db_error.StatementError
	}
	defer stmt.Close()

	_, err = stmt.Exec(room_id)

	if err != nil {
		log.Println(err)
		return db_error.ExecError
	}

	return nil
}
