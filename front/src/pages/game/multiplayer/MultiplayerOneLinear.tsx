import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { parseGameWS, createIClientProgress, createIClientAction, createIClientFinish } from '@/util/game'
// import '@/App.css'
import '@/hooks/useSinglePlayerGame'
import useMultiplayerOneLinear from '@/hooks/useMultiPlayerMode'
import { useEventListener } from 'usehooks-ts'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Table } from 'react-daisyui' 
import Tab from 'react-daisyui/dist/Tabs/Tab'
import {
    IClientProgress,
    IClientAction,
    IClientFinish, 

    TServerMessageType, 
    IServerRanking,
    IServerProgress,
    IServerFinish, 
} from '@/types/api/game'
import { useUserInfoStore } from '@/store/UserInfoStore'
import { useRoomInfoStore } from '@/store/RoomInfoStore'
/*
  ゲーム終了 => ResultPageに移動

*/

interface Props {

}


const MultiplayerOneLinear: React.FC<Props> = () => {

	const { userInfo, setUserInfo } = useUserInfoStore()
	const { roomInfo, setRoomInfo } = useRoomInfoStore()
	const [ socketUrl, setSocketUrl] = useState('ws://localhost:8080/echo')
	const { sendMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl)
  const [ lastSend, setLastSend ] = useState("")

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState];
  const [ userId, setUserId ] = useState<string>("")
  const { state, handleKey } = useMultiplayerOneLinear()


  // とりあえず受け取ったメッセージをコンソール出力する
  useEffect(() => { 
    if (lastJsonMessage !== null) {   
        const message = parseGameWS(JSON.stringify(lastJsonMessage))
        pipe (
            message,
            O.match(
                () => console.log("PreparePage"),
                (message) => { 
                // いける
                if (message.type === "server_current_ranking") {
                  const r : IServerRanking = message
                  console.log(r.data)
                }
                else if (message.type === "server_user_progress") {
                  const p : IServerProgress = message 
                  console.log(p.data)
                }
                else if (message.type === "server_finish") {
                  const f : IServerFinish= message
                  console.log(f.data) 
                  navigate('/game/multiplayer/room/result') 
                }  
              }
            )
        )
    }
  },[lastJsonMessage])
  
  // キー入力毎に進捗をサーバーに通知
  const keyPress = (updateState: ((key: string) => void)) => (e: any) => {
    const key: string = e.key
    updateState(key)
    //  
    const data = createIClientProgress(
      { 
        user_id: userId,
        Q_n : state.Q_n,
        Q_n_i : state.input_n,
        typo : state.typo
      } 
    )
    setLastSend(JSON.stringify(data))
    sendMessage(JSON.stringify(data))  
  } 
  
  useEventListener('keydown', keyPress(handleKey))

  const navigate = useNavigate()
  // ゲーム終了時の処理
  useEffect(() => {
    if (state.finished) {
      // サーバーに通知 
      sendMessage(JSON.stringify(
        createIClientFinish({
          user_id : userId
        }) 
      ))
    }
    // console.log(state)
  }, [state])


  // 順位変動 

  return (
    <>
			<h1>{roomInfo.roomName} ゲーム画面</h1>
			<p>The WebSocket is currently {connectionStatus}</p>
			<>
				url: 
				<input
					type="text"
					size={50}
					defaultValue={socketUrl}
					onChange={(e) =>
						setSocketUrl(e.target.value)
					} 
				/>
        <br/> 
        <h3>send</h3>
        <p>            
          {
            lastSend
          }
        </p>
        <h3>recieved</h3>
        <p>            
          {
            lastMessage?.data
          }
        </p>
        <hr/>
			</>
      {
        state.finished ?
          <>
            <h1>finish</h1>
            <Button onClick={() => navigate('/game/multiplayer/room/result')}>
              結果を見る
            </Button>
          </>
          :
          <>
            <h2>{state.Q_n + 1} / {state.questions.length}  </h2>
            <h1>{
              state.questions[state.Q_n].codes[0].split('')
                .map((key, idx) => {
                  if (idx < state.input_n) {
                    return <span style={{ color: "white" }} key={idx}>{key}</span>
                  } else {
                    return <span style={{ color: "gray" }} key={idx}>{key}</span>
                  }
                })
            }</h1>
            <h2>{state.questions[state.Q_n].language}, {state.questions[state.Q_n].tips}</h2>
            {/* <> 
                <Table>
                  <Table.Head className='w-full'> 
                    <span>Name</span>
                    <span>Prediction</span> 
                  </Table.Head>
                  <Table.Body>
                    <Table.Row>
                      <span>1</span>
                      <span>2</span>
                    </Table.Row>
                  </Table.Body>  
                </Table>
                
              </>  */}
          </>



      }
    </>
  )
}

export default MultiplayerOneLinear