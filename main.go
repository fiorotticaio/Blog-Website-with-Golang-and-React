package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/database"
) 

func main() {
	database.Connect()
	err := godotenv.Load() // Load .env file
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	port := os.Getenv("PORT") // Get PORT from .env file
	app := fiber.New() // Create a new Fiber app
	app.Listen(":" + port) // Listen on the specified port
}