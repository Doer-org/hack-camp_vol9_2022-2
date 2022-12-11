package repository

import "github.com/Doer-org/hack-camp_vol9_2022-2/domain/entity"

type QuestionRepository interface {
	CreateQuestion(id string, code string, tips int, language int) (*entity.Question, error)
	GetQuestionOfID(id string) (*entity.Question, error)
	DeleteAllQuestion() error
	DeleteQuestionOfID(id string) error
}