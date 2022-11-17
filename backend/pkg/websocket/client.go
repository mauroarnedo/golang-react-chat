package websocket

import (
	"encoding/json"
	"fmt"
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
	mu   sync.Mutex
}

type Message struct {
	Name string `json:"name"`
	Type int    `json:"type"`
	Body string `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()
	for {
		var msgJson Message
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		err = json.Unmarshal(p, &msgJson)
		if err != nil {
			fmt.Println("error:", err)
			return
		}
		message := Message{Type: messageType, Body: msgJson.Body, Name: msgJson.Name}
		c.Pool.Broadcast <- message
		fmt.Printf("Message received: %+v\n", msgJson)
	}
}
