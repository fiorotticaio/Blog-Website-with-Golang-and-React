package main

import (
	"log"
	"os"

	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/database"
	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	database.Connect() // Connect to the database

	err := godotenv.Load() // Load .env file
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("PORT") // Get PORT from .env file
	app := fiber.New()        // Create a new Fiber app

	// Configure CORS settings
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3001",
		AllowMethods:     "GET, POST, PUT, PATCH, DELETE, OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	routes.Setup(app)      // Setup the routes
	app.Listen(":" + port) // Listen on the specified port
}
