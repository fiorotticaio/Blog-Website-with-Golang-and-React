package routes

import (
	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/controller"
	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/middleware"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controller.Register)
	app.Post("/api/login", controller.Login)

	app.Use(middleware.IsAuthenticated)
	app.Post("/api/post", controller.CreatePost)
	app.Get("/api/post/:id", controller.DetailPost)
	app.Get("/api/allpost", controller.AllPost)
	app.Put("/api/updatepost/:id", controller.UpdatePost)
	app.Get("/api/uniquepost", controller.UniquePost)
	app.Delete("/api/deletepost/:id", controller.DeletePost)
	app.Post("/api/upload-image", controller.Upload)

	app.Static("/api/uploads", "./uploads")
}
