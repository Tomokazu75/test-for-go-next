package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Post struct {
	ID      uint   `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

type Shop struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type Category struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type Menu struct {
	ID    uint   `json:"id"`
	Name  string `json:"name"`
	Image string `json:"image"`
	Price string `json:"price"`
}

type MenuCategory struct {
	ID         uint `json:"id"`
	MenuID     uint `json:"menu_id"`
	CategoryID uint `json:"category_id"`
	ShopID     uint `json:"shop_id"`
}

func main() {
	dsn := "root:root@tcp(mysql)/test?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&Post{})

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.GET("/posts", func(c *gin.Context) {
		var posts []Post
		if err := db.Find(&posts).Error; err != nil {
			c.JSON(500, gin.H{"error": "No data in database"})
			return
		}
		c.JSON(200, posts)
	})
	r.GET("/posts/:id", func(c *gin.Context) {
		var post Post
		id := c.Param("id")
		if err := db.First(&post, id).Error; err != nil {
			c.JSON(500, gin.H{"error": "No data in database"})
			return
		}
		c.JSON(200, post)
	})
	r.POST("/posts/create", func(c *gin.Context) {
		var post Post
		if err := c.ShouldBindJSON(&post); err != nil {
			c.JSON(400, gin.H{
				"error": "send data is wrong",
			})
			return
		}
		db.Create(&post)
		c.JSON(200, post)
	})
	r.PUT("/posts/:id", func(c *gin.Context) {
		var post Post
		id := c.Param("id")
		if err := db.First(&post, id).Error; err != nil {
			c.JSON(500, gin.H{"error": "No post in database"})
			return
		}
		if err := c.ShouldBindJSON(&post); err != nil {
			c.JSON(400, gin.H{"error": "can't bind data"})
			return
		}
		if err := db.Model(&post).Updates(&post).Error; err != nil {
			c.JSON(500, gin.H{"error": "can't update post"})
			return
		}
		c.JSON(200, post)
	})
	r.Run(":9090")
}
