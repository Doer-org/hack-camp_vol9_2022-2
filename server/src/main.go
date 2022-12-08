package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Doer-org/hack-camp_vol9_2022-2/server/src/handlers"
)

func main() {
	db, err := database.NewDB()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	r := router.NewRouter()
	r.InitRoomRouter(db)
	r.InitHealthRouter()

	r.Serve()
}
