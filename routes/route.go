package routes

import (
	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/controller"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controller.Register)
}
