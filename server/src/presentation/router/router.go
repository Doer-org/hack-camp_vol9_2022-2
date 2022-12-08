package router

import (
	"fmt"

	"github.com/Doer-org/hack-camp_vol9_2022-2/config"
	"github.com/gin-gonic/gin"
)

type Router struct {
	Engine *gin.Engine
}

// NewRouterは新しいRouterを初期化し構造体のポインタを返します
func NewRouter() *Router {
	e := gin.Default()
	r := &Router{
		Engine: e,
	}

	// middlewareの設定
	r.setMiddleware()

	return r
}

// Serveはhttpサーバーを起動します
func (r *Router) Serve() {
	r.Engine.Run(fmt.Sprintf(":%s", config.Port()))
}
