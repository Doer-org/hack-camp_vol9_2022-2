module Domain = 
    type QuestionMode = 
        | OneLinear
        | MultiLiear // OneLinearを複数個並べる 

    type PlayerMode = 
        | Single 
        | Multiplayer

    type GameMode = {
        QuestionMode: QuestionMode
        PlayerMode: PlayerMode
    }

    type Question = {
        // questionID : int
        code : string // 半角英数字，記号に限る
        tips : string
        language : string
    }

    type Score = {
        総タイプ数 : int 
        誤タイプ数 : int
    }

    type GameState = {
        gameMode : GameMode 
        問題進捗状況 : undefined
    } 

    type Message = 
        | Nothing
        | PlayerStatus  
        | PlayerAction // ゲームモード変更，問題変更，

    type Plactice = Question list -> Score list

    type Multiplayer = 
        (Message -> unit) // 進捗状況や相手への攻撃をサーバーに送信する．
            -> (Message -> GameState -> GameState) // サーバーからプレイヤーの進捗状況を受け取り，GameStateを変更する．
            -> GameState // 初期状態

    type MultiplayerServer = Message 


    ()

module Server = 
    open Domain
    
    module Database = 
        module Code = 
            let updateQuestion (questionID : int) (question : Question) =
                ()

            let getRandomQuestion () : Question list = [
                { code = "hoge"
                  tips = "fuga"
                  language = "C#" },
                
                { code = "hoge"
                  tips = "fuga"
                  language = "F#" }
            ]

    module Game = 
        type Player = undefined  

        let createQuestions = function 
            | OneLinear -> []

        let sendMessage (player : Player)  (message : Message) = ()

        module Practice = 
            let init (ctx : Player) = function
                | OneLinear -> 
                    let questions = [for _ in 0..5 -> createQuestions OneLinear]
                    sendMessage ctx Message.Nothing 

        module Multiplayer = 
            let createMultiplayerRoom ()  =  // dispatch[]
                // 接続待機
                let (players : Player[]) = []
                let (dispatchers : ('GameState -> ()) []) = [] // クライアントに更新された状態を投げる
                // 複数人のプレイヤーの状態をサーバーで一元管理する．
                let room = 
                    MailboxProcessor<Message>.Start(fun inbox -> 
                        let rec loop (roomState : int) = 
                            async {
                                let! msg = inbox.Receive()
                                // 特定のメッセージでゲームを強制終了する？
                                let nextRoomState = // 状態を更新
                                    match msg with 
                                    | Message.Nothing -> roomState
                                    | Message.PlayerStatus -> roomState
                                    | Message.PlayerAction -> roomState                                     
                                let nextRoomState = roomState 
                                dispatchers |> Array.iter(fun f -> f nextRoomState)
                                // 状態をブロードキャスト
                                // ゲーム終了判定
                                return! loop roomState// 次のメッセージを待機 
                            }
                        loop 0
                    )   
                // ゲーム開始，プレイヤーからの入力を受け取る
                async { 
                    room.Post Message.Nothing
                } 
                // 一定時間経過後にゲーム強制終了（キャンセレーショントークン）
                room
                |> Async.Start()

                // ゲームが終わったら，次の画面へリダイレクトする要求を投げる
                ()

    module API = 
        let getOnelinearQuestion (player : Player) = [] 
 

module Client = 
    open Domain 

    module API = 
        let getOnelinearQuestion (mode: GameMode) : Question list = []
        let getMultiplayerGameState () = 
            {
                gameMode = OneLinear
                playerMode = Multiplayer
                問題進捗状況 = undefined
            }

    module Practice = 
        let init () = 
            let questions = API.getOnelinearQuestion OneLinear 
            // 良い感じにゲームっぽく進める            
            () 

    module Multiplayer =  
        let init () = 
            let initGameState = API.getMultiplayerGameState ()
            // サーバーと同期してゲームを進める．        
            ()

    module CodeReview = 
        ()


    ()
