package models

import "time"

type Post struct {
	Id        uint      `json:"id"`
	Title     string    `json:"title"`
	Desc      string    `json:"desc"`
	Image     string    `json:"image"`
	UserID    string    `json:"user_id"`
	User      User      `json:"user" gorm:"foreignKey:UserID"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
