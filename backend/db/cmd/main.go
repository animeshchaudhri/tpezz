package main

import (
	"backend/db"
	"log"
)

func main() {

	_, err := db.NewDatabase()
	if err != nil {
		log.Fatal(err)
	}

}
