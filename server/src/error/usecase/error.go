package usecase

import "errors"

var (

	//roomのエラー
	IdEmptyError     = errors.New("id empty")
	NameEmptyError   = errors.New("name empty")
	
)