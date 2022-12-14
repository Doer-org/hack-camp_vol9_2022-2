package persistance

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"
	"github.com/Doer-org/hack-camp_vol9_2022-2/domain/repository"
	db_error "github.com/Doer-org/hack-camp_vol9_2022-2/error/infrastructure"
)

var _ repository.IMemberRepository = &MemberRepository{}

type MemberRepository struct {
	db *sql.DB
}

func NewMemberRepository(db *sql.DB) *MemberRepository {
	return &MemberRepository{
		db: db,
	}
}

func (repo *MemberRepository) CreateMember(userId string, userName string, roomId string) (*entity.Member, error) {
	statement := "INSERT INTO members (user_id, user_name, room_id) VALUES(?,?,?)"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("%v : %v", db_error.StatementError, err)
	}
	defer stmt.Close()

	member := &entity.Member{}
	_, err = stmt.Exec(userId, userName, roomId)
	member.UserId = userId
	member.UserName = userName
	member.RoomId = roomId

	if err != nil {
		log.Println(err)
		return nil, db_error.ExecError
	}

	return member, nil
}

func (repo *MemberRepository) GetAllMembersOfRoomID(roomId string) (entity.Members, error) {

	rows, err := repo.db.Query("SELECT * FROM members WHERE room_id = ?", roomId)
	if err != nil {
		log.Println(err)
		return nil, db_error.StatementError
	}
	defer rows.Close()

	var member entity.Members

	for rows.Next() {
		m := &entity.Member{}
		err := rows.Scan(&m.UserId, &m.UserName, &m.RoomId)
		if err != nil {
			log.Println(err)
			return nil, db_error.RowsScanError
		}
		member = append(member, m)
	}

	err = rows.Err()
	if err != nil {
		log.Println(err)
		return nil, db_error.RowsLoopError
	}

	return member, nil
}

func (repo *MemberRepository) DeleteAllMembersOfRoomID(roomId string) error {
	statement := "DELETE FROM members WHERE room_id = ?"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return db_error.StatementError
	}
	defer stmt.Close()

	_, err = stmt.Exec(roomId)

	if err != nil {
		log.Println(err)
		return db_error.ExecError
	}

	return nil
}
