package controller

import (
	"fmt"
	"log"
	"regexp"
	"strings"

	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/database"
	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/models"
	"github.com/gofiber/fiber/v2"
)

func validateEmail(email string) bool {
	Re := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`) // Regular expression for email validation
	return Re.MatchString(email)
}

func Register(c *fiber.Ctx) error {
	var data map[string]interface{}
	var userData models.User

	// Parse the body of the request
	if err := c.BodyParser(&data); err != nil {
		fmt.Println("Unable to parse body")
	}

	// Check if password is less then 7 caracters
	if len(data["password"].(string)) < 7 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Password must be at least 7 characters",
		})
	}

	// Check if email is valid
	if !validateEmail(strings.TrimSpace(data["email"].(string))) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid email",
		})
	}

	// Check if email is already exists in database
	database.DB.Where("email = ?", strings.TrimSpace(data["email"].(string))).First(&userData)
	if userData.Id != 0 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Email already exists",
		})
	}

	// Create a new user
	user := models.User{
		FirstName: data["first_name"].(string),
		LastName:  data["last_name"].(string),
		Phone:     data["phone"].(string),
		Email:     strings.TrimSpace(data["email"].(string)),
	}

	// Set the password
	user.SetPassword(data["password"].(string))

	// Save the new user to the database
	err := database.DB.Create(&user)
	if err.Error != nil {
		log.Println(err.Error)
	}

	// Send the response to frontend
	c.Status(200)
	return c.JSON(fiber.Map{
		"user":    user,
		"message": "User created successfully",
	})
}
