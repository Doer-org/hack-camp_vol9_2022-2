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
    
    return (
        <>
            <h1>Result</h1>
            <h2>ランキング</h2>
            <h2>出題リスト</h2>
            <p>クレームボタン</p>
            {/* 同じルームIDで */}
            <Button onClick={() => navigate('/game/multiplayer/prepare-room')}>
                もう一度遊ぶ
            </Button>
        </>
    )
}

export default ResultPage