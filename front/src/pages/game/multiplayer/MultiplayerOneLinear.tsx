import * as O from 'fp-ts/Option'
// import '@/App.css'
import '@/hooks/useSinglePlayerGame'
import useMultiplayerOneLinear from '@/hooks/useMultiPlayerMode'
import { useEventListener } from 'usehooks-ts'
import useWebSocket, { ReadyState } from 'react-use-websocket' 
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Table } from 'react-daisyui'
import Tab from 'react-daisyui/dist/Tabs/Tab'
/*
  ゲーム終了 => ResultPageに移動

*/

interface Props {

}
 

const MultiplayerOneLinear: React.FC<Props> = () => { 
    const keyPress = (handler : ((key: string) => void)) => (e : any) => {  
      const key : string = e.key
      handler(key)
    }  
    const { state, handleKey } = useMultiplayerOneLinear() 
    useEventListener('keydown', keyPress(handleKey))

    const navigate = useNavigate()
    // ゲーム終了時の処理
    useEffect(() => { 
      if (state.finished) {
        // サーバーに通知
        // navigate('/game/multiplayer/room/result')
      }
      // console.log(state)
    }, [state])


    // 順位変動 

    return (
      <>  
        <h1>multi player</h1>
        {
          state.finished ? 
            <>
              <h1>finish</h1>
              <Button onClick={() => navigate('/game/multiplayer/room/result') }>
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
                    return <span style={{color: "white"}}>{key}</span>
                  } else {
                    return <span style={{color: "gray"}}>{key}</span>
                  }
                } ) 
              }</h1> 
              <h2>{state.questions[state.Q_n].language}, {state.questions[state.Q_n].tips}</h2>   
              <>
                {/* 'IntrinsicAttributes & UserProps[]' に割り当てることはできません。 */}
                <Table>
                  <Table.Head className='w-full'>
                    {/* <span>Name</span> */}
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
                
              </> 
            </>
            


        }
      </>
    )
}

export default MultiplayerOneLinear