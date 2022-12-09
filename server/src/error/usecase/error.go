package usecase

import "errors"

var (

	//roomのエラー
	IdEmptyError     = errors.New("id empty")
	NameEmptyError   = errors.New("name empty")
	MaxMemberError   = errors.New("max member failed")
	MemberCountError = errors.New("member count failed")
	RoomdIdUsedError = errors.New("room id already used")
)
