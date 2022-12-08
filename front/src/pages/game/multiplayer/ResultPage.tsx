import { useResultStore } from '@/store/ResultStore'
import { useRoomInfoStore } from '@/store/RoomInfoStore'
import { useUserInfoStore } from '@/store/UserInfoStore'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from 'react-daisyui'
import { useNavigate } from 'react-router-dom'

/*
    サーバから結果を取得．表示 
    コード評価
*/

interface Props {
    
}

const ResultPage : React.FC<Props> = () => {
    const navigate = useNavigate()
	const { userInfo, setUserInfo } = useUserInfoStore()
	const { roomInfo, setRoomInfo } = useRoomInfoStore()
    const { result, setResult } = useResultStore()
    
    return (
        <>
            <h1>Result</h1>
            <h2>ランキング</h2>
            <hr/>
            <p>精度： {result.accurasy * 100} %</p>
            <hr/>
            <h2>出題リスト</h2>
            <>
                {
                    result.questions.map((value, i) => {
                        // ボタン押したらモーダル => クレーム？ 
                        return (
                            <p key={i}><button>{i}</button>{value.codes[0]}</p>
                        )
                    })
                }
            </>
            <hr/>
            {/* 同じルームIDで */}
            <Button onClick={() => navigate('/game/multiplayer/prepare-room')}>
                もう一度遊ぶ
            </Button>
        </>
    )
}

export default ResultPage