package persistance

import (
	"database/sql"
	"log"

	"github.com/Doer-org/hack-camp_vol9_2022-1/domain/entity"
	"github.com/Doer-org/hack-camp_vol9_2022-1/domain/repository"
	db_error "github.com/Doer-org/hack-camp_vol9_2022-1/error/infrastructure"
)

var _ repository.QuestionRepository = &QuestionRepository{}

type QuestionRepository struct {
	db *sql.DB
}

func NewQuestionRepository(db *sql.DB) *QuestionRepository {
	return &QuestionRepository{
		db: db,
	}
}

func (repo *QuestionRepository) NewQuestion(id string, code string, tips string, language string) (*entity.Question, error) {
	statement := "INSERT INTO questions VALUES(?,?,?,?)"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return nil, db_error.StatementError
	}
	defer stmt.Close()

	question := &entity.Question{}
	_, err = stmt.Exec(id, code, tips, language)

	question.Id = id
	question.Code = code
	question.Tips = tips
	question.Language = language
	

	if err != nil {
		log.Println(err)
		return nil, db_error.ExecError
	}

	return question, nil
}
func (repo *QuestionRepository) GetQuestionOfID(id string) (*entity.Question, error) {
	statement := "SELECT * FROM questions WHERE id = ?"

	stmt, err := repo.db.Prepare(statement)
	if err != nil {
		log.Println(err)
		return nil, db_error.StatementError
	}
	defer stmt.Close()

	question := &entity.Question{}
	err = stmt.QueryRow(id).Scan(&question.Id, &question.Code,  &question.Tips,  &question.Language)

	if err != nil && err != sql.ErrNoRows {
		log.Println(err)
		return nil, db_error.QueryrowError
	}

	return question, nil
}

func (repo *QuestionRepository) DeleteAllQuestion() error {
	statement := "DELETE FROM questions"

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