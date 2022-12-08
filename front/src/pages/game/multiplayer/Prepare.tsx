
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal } from 'react-daisyui' 
import useWebSocket, {ReadyState} from 'react-use-websocket'
import { useLocation, useNavigate } from "react-router-dom"
// import * as RoomApi from '@/api/room'
import {parsePrepairWS} from '@/api/prepare'
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import {
    TServerMessageType, 
    IServerJoin, 
} from '@/types/api/prepare'
import { useRoomApi } from '@/hooks/useRoomApi'

interface Props { 
}

const PreparePage: React.FC<Props> = () => {     
    const search = new URLSearchParams(useLocation().search)
    const [ hasJoined, setJoined] = useState(false)   
    const [ userName, setUserName] = useState<string>("")
    const [ roomId, _] = useState<string>(search.get("room_id") ?? "") // クエリパラメータから取得
    const [ userId, setUserId] = useState<string>("")
    const [ members, setMembers] = useState<IServerJoin[]>([])
    const { sendMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket('ws://localhost:8080/echo')
    const roomApi = useRoomApi()

    // room_idが無効な場合

    useEffect(() => { 
        if (lastJsonMessage !== null) {   
            const message = parsePrepairWS(JSON.stringify(lastJsonMessage))
            pipe (
                message,
                O.match(
                    () => console.log("PreparePage"),
                    (members) => {
                        console.log(members) 
                        setMembers(members) // ルーム参加者の一覧を更新
                    }
                )
            )
        }
    },[lastJsonMessage])

    useEffect(() => { 
        if (lastMessage !== null) {  
            console.log("WebSocket > " + lastMessage.data)
        }
    },[lastMessage])

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState]; 

    
    const joinRoom = () => {
        // /member/new?room=roomID から新規メンバーの追加 
        const resp = roomApi.postAddNewMember({user_name: userName, room_id: roomId}) 
        pipe(
            resp,
            TE.match (
                (error) => console.log("joinRoom" + error),
                (ok) => { 
                    // console.log("ok > " + JSON.stringify(ok))
                    setUserId(ok.user_id) 
                }
            )
        )() 

        // WebSocketのメンバー追加通知の中に自身のIDが含まれるか確認
        sendMessage('joined!') 
        setJoined(true)
    } 
 

    const navigate = useNavigate()
    return (
      <>   
        <h1>待機画面</h1> 
        <p>The WebSocket is currently {connectionStatus}</p>
        <hr/>
        {
            hasJoined ?                     
                <>
                    <p>参加者一覧</p> 
                    <p>あおき</p> 
                    <p>コウタ</p> 
                    <p>Kai</p> 
                    <Button 
                        onClick={() => navigate(`/game/multiplayer/room`)}
                    >
                        Game Start !
                    </Button> 
                </>
            :
                <>   
                    <>
                        <p>なまえの登録</p>
                        <input 
                            type="text"
                            defaultValue={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <p>いろいろ，スコアボードにのせる情報の登録</p>
                    </> 
                    <Button
                        onClick={joinRoom}
                        disabled={readyState !== ReadyState.OPEN}
                    >
                        Join !
                    </Button>   
                </> 
        } 

      </>
    )
}

export default PreparePage