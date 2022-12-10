package usecase

import "errors"

var (

	//roomのエラー
	IdEmptyError      = errors.New("id empty")
	NameEmptyError    = errors.New("name empty")
	MaxMemberError    = errors.New("max member failed")
	MemberCountError  = errors.New("member count failed")
	RoomdIdUsedError  = errors.New("room id already used")
	RoomdIdEmptyError = errors.New("room id empty")

	//chatのエラー
	MessageEmptyError  = errors.New("message empty")
	SizeEmptyError     = errors.New("size empty")
	RoomIdEmptyError   = errors.New("room id empty")
	MemberIdEmptyError = errors.New("room id already used")
)
