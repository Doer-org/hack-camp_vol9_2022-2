package main

import (
	"github.com/Doer-org/hack-camp_vol9_2022-2/infrastructure/database"
	"github.com/Doer-org/hack-camp_vol9_2022-2/presentation/router"
)

func main() {
	db, err := database.NewDB()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	r := router.NewRouter()
	r.InitRoomRouter(db)
	r.InitMemberRouter(db)
	r.Serve()
}
