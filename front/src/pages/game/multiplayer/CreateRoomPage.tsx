
import React, { useState } from 'react'
import { Button, Modal } from 'react-daisyui'
import { useCopyToClipboard } from 'usehooks-ts' 
import { useRoomApi } from '@/hooks/useRoomApi'  
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'

interface Props {

}

const CreateRoomPage: React.FC<Props> = () => {  
    const [value, copyToClipboard] = useCopyToClipboard()
    const roomAPI = useRoomApi()
    return (
      <>  
        <h1>Create Room</h1> 
        <p>一緒に遊ぶ人に<a href='http://127.0.0.1:5173/game/multiplayer/prepare-room?room_id=hogefugaroomid'>リンク</a>を教えましょう！</p> 
        <p> いろいろ設定項目 １ </p>
        <p> いろいろ設定項目 ２ </p>
        <p> いろいろ設定項目 ３ </p>
        <Button
            color="primary" 
            onClick={() =>  {
                copyToClipboard("http://127.0.0.1:5173/game/multiplayer/prepare-room?room_id=hogefugaroomid")
                
                pipe(
                  roomAPI.postCreateRoom({room_name: "hogefugaroomid", max_count: 3}),
                  TE.match(
                    (e) => console.log(e),
                    (room) => console.log(room)
                  )
                )()
                console.log("copyied!")
            }}
        >
            Create Room
        </Button>
      </>
    )
}

export default CreateRoomPage