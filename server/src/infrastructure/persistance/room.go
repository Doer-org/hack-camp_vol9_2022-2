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

func (repo *RoomRepository) NewRoom(id string, name string, max_member int, member_count int) (*entity.Room, error) {
	statement := "INSERT INTO rooms VALUES(?,?,?,?)"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return nil, db_error.StatementError
	}
	defer stmt.Close()

	room := &entity.Room{}
	_, err = stmt.Exec(id, name, max_member, member_count)

	room.Id = id
	room.MaxMember = max_member
	room.MemberCount = member_count
	room.Name = name

	if err != nil {
		log.Println(err)
		return nil, db_error.ExecError
	}

	return room, nil
}
func (repo *RoomRepository) GetRoomOfID(id string) (*entity.Room, error) {
	statement := "SELECT * FROM rooms WHERE id = ?"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return nil, db_error.StatementError
	}
	defer stmt.Close()

	room := &entity.Room{}
	err = stmt.QueryRow(id).Scan(&room.Id, &room.Name, &room.MaxMember, &room.MemberCount)

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

func (repo *RoomRepository) DeleteRoomOfID(id string) error {
	statement := "DELETE FROM rooms WHERE id = ?"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return db_error.StatementError
	}
	defer stmt.Close()

	_, err = stmt.Exec(id)

	if err != nil {
		log.Println(err)
		return db_error.ExecError
	}

	return nil
}
