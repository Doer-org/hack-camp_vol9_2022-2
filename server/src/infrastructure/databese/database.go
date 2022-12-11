package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"

	"github.com/Doer-org/hack-camp_vol9_2022-2/config"
)

func NewDB() (*sql.DB, error) {
	dbDSN, err := config.DSN()
	if err != nil {
		return nil, err
	}
	db, err := sql.Open("mysql", dbDSN)
	if err != nil {
		return nil, fmt.Errorf("failed to open MySQL : %w", err)
	}

	err = db.Ping()

	if err != nil {
		log.Println("DB接続失敗")
		panic(err)
	} else {
		log.Println("DB接続成功")
	}

	return db, err
}