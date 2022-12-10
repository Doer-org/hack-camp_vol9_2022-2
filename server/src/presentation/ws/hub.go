package ws

import (
	"fmt"

	"github.com/Doer-org/hack-camp_vol9_2022-2/presentation/json"
)

type Hub struct {
	// Registered clients.
	Clients map[*Client]bool

	// Inbound messages from the clients.
	BroadcastRoom chan *json.GameJson

	// Register requests from the clients.
	Register chan *Client

	// Unregister requests from clients.
	Unregister chan *Client

	RoomId json.RoomIdJson
}

type Hubs map[json.RoomIdJson]*Hub

// NewHubは新しいHubオブジェクトを生成します
func NewHub(roomId json.RoomIdJson) *Hub {
	return &Hub{
		BroadcastRoom: make(chan *json.GameJson),
		Register:      make(chan *Client),
		Unregister:    make(chan *Client),
		Clients:       make(map[*Client]bool),
		RoomId:        roomId,
	}
}

type HubsStore struct {
	Hubs *Hubs
}

func NewHubsStore() *HubsStore {
	return &HubsStore{
		Hubs: NewHubs(),
	}
}

// NewHubsは新たにHubsオブジェクトのポインタを返します
func NewHubs() *Hubs {
	return &Hubs{}
}

// RunはHubを起動し、待ち受け状態にします
func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			h.Clients[client] = true
		case client := <-h.Unregister:
			if _, ok := h.Clients[client]; ok {
				delete(h.Clients, client)
				close(client.SendRoomInfo)
			}
		// BroadcastRoomにroom情報が来た時、各ClientのSendRoomInfoチャネルにroom情報を送る
		case room := <-h.BroadcastRoom:
			for client := range h.Clients {
				select {
				case client.SendRoomInfo <- room:
				default:
					close(client.SendRoomInfo)
					delete(h.Clients, client)
				}
			}
		}
	}
}

func (h *HubsStore) SetNewHubOfRoomId(hub *Hub, roomId json.RoomIdJson) {
	(*h.Hubs)[roomId] = hub
}

func (h *HubsStore) GetExistsHubOfRoomId(roomId json.RoomIdJson) (*Hub, bool) {
	hub, ok := (*h.Hubs)[roomId]
	if !ok {
		return nil, false
	}
	return hub, true
}

func (h *HubsStore) CheckAndDeleteHubOfRoomId(roomId json.RoomIdJson) error {
	_, found := h.GetExistsHubOfRoomId(roomId)
	if !found {
		return fmt.Errorf("Hubs.CheckAndDeleteHubOfRoomId Error : roomId not found in Hubs")
	}

	delete(*h.Hubs, roomId)
	return nil
}

func (h *HubsStore) GetConnCountOfRoomId(roomId json.RoomIdJson) (int, error) {
	_, found := h.GetExistsHubOfRoomId(roomId)
	if !found {
		return 0, fmt.Errorf("hub not found (roomId:%s)", (string)(roomId))
	}

	cntConn := len((*h.Hubs)[roomId].Clients)
	return cntConn, nil
}
