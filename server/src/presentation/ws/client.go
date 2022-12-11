package ws

import (
	"time"

	"github.com/Doer-org/hack-camp_vol9_2022-2/presentation/json"
	"github.com/gorilla/websocket"
)

type Client struct {
	Hub          *Hub
	Conn         *websocket.Conn
	SendRoomInfo chan *json.GameJson
	RoomId       json.RoomIdJson
}

// setConnectionConfigはClientのコネクション情報に関する設定をします
func (c *Client) setConnectionConfig() {
	c.Conn.SetReadLimit(maxMessageSize)
	c.Conn.SetReadDeadline(time.Now().Add(pongWait))
	c.Conn.SetPongHandler(func(string) error { c.Conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
}

// setWriteDeadlineはClientの書き込み時間のデッドラインを設定します
func (c *Client) setWriteDeadline() {
	c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
}
