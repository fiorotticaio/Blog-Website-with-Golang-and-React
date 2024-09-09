package database

import (
	"log"
	"os"

	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	err := godotenv.Load() // Load .env file
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := os.Getenv("DSN")                                     // Get DSN from .env file
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{}) // Connect to MySQL
	if err != nil {
		panic("Could not connect to the database")
	} else {
		log.Println("Connected successfully to the database")
	}

	DB = database // Set the global DB variable to the database connection

	// Migrate the models (tables) to the database
	database.AutoMigrate(
		&models.User{},
		&models.Blog{},
	)
}
