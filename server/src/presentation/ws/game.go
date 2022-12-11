package ws

import (
	"log"
	"net/http"
	"time"

	"github.com/Doer-org/hack-camp_vol9_2022-2/presentation/json"
	"github.com/Doer-org/hack-camp_vol9_2022-2/usecase"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type RoomWsHandler struct {
	ucGame    usecase.IGameUsecase
	ucRoom    usecase.IRoomUsecase
	HubsStore *HubsStore
}

func NewRoomWsHandler(ucGame usecase.IGameUsecase, ucRoom usecase.IRoomUsecase, hubsStore *HubsStore) *RoomWsHandler {
	return &RoomWsHandler{
		ucGame:    ucGame,
		ucRoom:    ucRoom,
		HubsStore: hubsStore,
	}
}

func (h *RoomWsHandler) ConnectWsRoom(ctx *gin.Context) {
	roomId := ctx.Param("room_id")
	roomIdJson := json.RoomIdEntityToJson(roomId)

	var hub *Hub
	// もしすでにroomIdのHubが存在していた場合hubに入れる
	hub, found := h.HubsStore.GetExistsHubOfRoomId(roomIdJson)

	// roomIdのHubが存在していなかったら新しく登録し、Hubを起動する
	if !found {
		hub = NewHub(roomIdJson)
		h.HubsStore.SetNewHubOfRoomId(hub, roomIdJson)
		go hub.Run()
	}
	//TODO: ここにroomがあるなら作成ないならjoinの関数を作りましょう
	h.serveWsConnOfHub(hub, ctx.Writer, ctx.Request, roomIdJson)
}

func (h *RoomWsHandler) DeleteHubOfRoomId(ctx *gin.Context) {
	roomId := ctx.Param("room_id")
	roomIdJson := json.RoomIdEntityToJson(roomId)

	// TODO 削除時に既存のクライアントのコネクションが残っているので直す
	// Hubの削除
	if err := h.HubsStore.CheckAndDeleteHubOfRoomId(roomIdJson); err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	ctx.JSON(
		http.StatusOK,
		gin.H{"ok": "delete hub of roomId successful"},
	)

}

// receiveEventInfoFromConnはクライアントからEvent情報が送られてきたとき、
// Eventごとに処理を行い、新たなRoom情報をBroadcastRoomInfoに書き込みます
func (h *RoomWsHandler) receiveEventInfoFromConn(c *Client) {
	defer func() {
		c.Hub.Unregister <- c
		c.Conn.Close()
	}()
	c.setConnectionConfig()

	for {
		eJson := json.GameJson{}
		// ここで処理をまつ
		if err := c.Conn.ReadJSON(&eJson); err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("Error : %v", err)
			}
			break
		}

		e := json.GameJsonToEntity(&eJson)
		// eventを実行して、最新のroomオブジェクトを返す
		room, err := h.ucGame.CreateGame(e.UserId, e.QN, e.QNI, e.Typo)
		if err != nil {
			log.Println("ExecEventOfEventType Error :", err)
		}

		roomJson := json.GameEntityToJson(room)
		c.Hub.BroadcastRoom <- roomJson
	}
}

// sendRoomInfoToAllClientsはBroadcastRoomInfoに入ってきたRoomの情報を
// Hubに登録されたすべてのクライアントに送ります
func (h *RoomWsHandler) sendRoomInfoToAllClients(c *Client) {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
	}()

	for {
		select {
		case room, ok := <-c.SendRoomInfo:
			c.setWriteDeadline()
			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			if err := c.Conn.WriteJSON(room); err != nil {
				log.Println("Error : write json failed")
			}

		case <-ticker.C:
			c.setWriteDeadline()
			if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

// serveWsConnOfHubはコネクションをwebsocket通信にアップグレードし、
// Clientオブジェクトを用意してClientを受け取ったHubに登録します
func (h *RoomWsHandler) serveWsConnOfHub(hub *Hub, w http.ResponseWriter, r *http.Request, roomId json.RoomIdJson) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error : ", err)
		return
	}

	client := &Client{
		Hub:          hub,
		Conn:         conn,
		SendRoomInfo: make(chan *json.GameJson),
		RoomId:       roomId,
	}

	// HubにClientを登録する
	client.Hub.Register <- client

	go h.sendRoomInfoToAllClients(client)
	go h.receiveEventInfoFromConn(client)
}
