package infrastructure

import "errors"

var (

	//roomのエラー
	StatementError = errors.New("statement error")
	ExecError      = errors.New("exec error")
	QueryrowError  = errors.New("queryrow error")
	RowsScanError  = errors.New("Rows Scan error")
)
