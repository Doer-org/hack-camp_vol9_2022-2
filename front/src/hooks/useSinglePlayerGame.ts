 
import {Question} from '@/types/Game'
import * as O from 'fp-ts/Option'   
import React, { useState } from 'react'
/*
    問題文表示
    次入力されるべき文字を強調表示
    キー入力に対して正誤判定，
        正解なら次の文字へ(総入力数+1)，不正解なら誤入力数+1 
    全文字入力完了したら，
        次の問題があれば次の問題へ，なければ終了し結果を表示
*/

type GameState = {
    key : string
    questions : Question[]
    Q_n : number
    input_n : number
}

export default () : {
    state : GameState
    handleKey : (key: string) => void
} => {

    const initState : GameState = {
        key : "",
        questions : [ 
            { codes : "printfn \"Hello World\"", tips : "Hello Worldを出力する", language : "F#" },
            { codes : "[1..10] |> List.map(fun x -> 2 * x)", tips : "1から10の整数のリストの要素を2倍する．", language : "F#" },
        ],
        Q_n : 0,
        input_n : 0 
    }

    const [state, setState] = useState<GameState>(initState)

    const handleKey = (key: string) => {
        if (key.length === 1) {
            // console.log(key + " " + state.input_n)
            const question = state.questions[state.Q_n]
            const code = question.codes
            if (code[state.input_n] === key)  {
                if (state.input_n + 1 === code.length) { 
                    if (state.Q_n + 1 === state.questions.length) {
                        setState({
                            key : state.key + key,
                            questions : state.questions,
                            Q_n : state.Q_n,
                            input_n: state.input_n + 1
                        })
                        console.log("finish")
                    } else { 
                        setState({
                            key : "",
                            questions : state.questions,
                            Q_n : state.Q_n + 1,
                            input_n: 0
                        }) 
                    }
                } else {
                    setState({
                        key : state.key + key,
                        questions : state.questions,
                        Q_n : state.Q_n,
                        input_n: state.input_n + 1
                    })
                } 
            } 
            else { 
                setState({
                    key : state.key,
                    questions : state.questions,
                    Q_n : state.Q_n,
                    input_n: state.input_n
                })
            }

        }
    }

    return { state, handleKey}
}