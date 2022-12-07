package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Doer-org/hack-camp_vol9_2022-2/server/src/handlers"
)

func main() {
	http.HandleFunc("/ws", handlers.NewWebsocketHandler().Handle)
	port := "80"
	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(fmt.Sprintf(":%v", port), nil); err != nil {
		log.Panicln("Serve Error:", err)
	}
}
