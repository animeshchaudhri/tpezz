package main

import (
	"time"

	route "backend/api/route"
	"backend/bootstrap"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	app := bootstrap.App()

	env := app.Env

	db := app.Mongo.Database(env.DBName)
	defer app.CloseDBConnection()

	timeout := time.Duration(env.ContextTimeout) * time.Second
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowCredentials = true
	config.AddAllowHeaders("Authorization")
	gin := gin.Default()
	

	gin.Use(cors.New(config))
	route.Setup(env, timeout, db, gin)

	gin.Run(env.ServerAddress)
}
