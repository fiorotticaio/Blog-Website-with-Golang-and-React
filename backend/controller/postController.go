package controller

import (
	"errors"
	"fmt"
	"math"
	"strconv"

	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/database"
	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/models"
	"github.com/fiorotticaio/Blog-Website-with-Golang-and-React/util"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func CreatePost(c *fiber.Ctx) error {
	var post models.Post
	if err := c.BodyParser(&post); err != nil {
		fmt.Println("Unable to parse body")
	}
	if err := database.DB.Create(&post).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid payload",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Post created successfully",
	})
}

func AllPost(c *fiber.Ctx) error {
	page, _ := strconv.Atoi(c.Query("page", "1"))
	limit := 10
	offset := (page - 1) * limit
	var total int64
	var post []models.Post
	database.DB.Preload("User").Offset(offset).Limit(limit).Find(&post)
	database.DB.Model(&models.Post{}).Count(&total)
	return c.JSON(fiber.Map{
		"data": post,
		"meta": fiber.Map{
			"total":     total,
			"page":      page,
			"last_page": math.Ceil(float64(int(total) / limit)),
		},
	})
}

func DetailPost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var post models.Post
	database.DB.Where("id=?", id).Preload("User").First(&post)
	return c.JSON(fiber.Map{
		"data": post,
	})

}

func UpdatePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	post := models.Post{
		Id: uint(id),
	}

	if err := database.DB.First(&post, id).Error; err != nil {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message": "Opps!, record Not found",
		})
	}

	if err := c.BodyParser(&post); err != nil {
		fmt.Println("Unable to parse body")
	}

	database.DB.Model(&post).Updates(post)

	return c.JSON(fiber.Map{
		"message": post,
	})

}

func UniquePost(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	id, _ := util.Parsejwt(cookie)
	var post []models.Post
	database.DB.Model(&post).Where("user_id=?", id).Preload("User").Find(&post)

	return c.JSON(post)

}
func DeletePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	post := models.Post{
		Id: uint(id),
	}
	deleteQuery := database.DB.Delete(&post)
	if errors.Is(deleteQuery.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Opps!, record Not found",
		})
	}

	return c.JSON(fiber.Map{
		"message": "post deleted Succesfully",
	})

}
