import { useResultStore } from '@/store/ResultStore' 
import {GameState, Question } from '@/types/Game'
import React, { useState } from 'react' 
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/lib/function'
/*
    
    問題文表示
    次入力されるべき文字を強調表示
    キー入力に対して正誤判定，
        正解なら次の文字へ(総入力数+1)，不正解なら誤入力数+1 
    全文字入力完了したら，
        次の問題があれば次の問題へ，なければ終了し結果を表示
*/ 

export default () : {
    state : GameState
    handleKey : (key: string) => void
} => {

    const initQuestions = [ 
        { codes : "printfn \"Hello World\"", tips : "Hello Worldを出力する", language : "F#" },
        { codes : "[1..10] |> List.map(fun x -> 2 * x)", tips : "1から10の整数のリストの要素を2倍する．", language : "F#" },
    ]

    const initState : GameState = {
        key : "",
        questions : initQuestions,
        record : pipe(
            initQuestions, 
            A.map((question) => question.codes.split('').map((v,i) => {return {status:'waiting', key:v}}))
        ),
        Q_n : 0,
        input_n : 0,
        typo : false,
        finished : false
    }

    const [ typeN, setTypeN ] = useState(0)
    const [ typoN, setTypoN] = useState(0)
    const { result, setResult } = useResultStore()

    const [ state, setState ] = useState<GameState>(initState)

    const handleKey = (key: string) => {
        if (key.length === 1) { 
            setTypeN(typeN + 1)
            const question = state.questions[state.Q_n]
            const code = question.codes
            const nextRecord = (inputKey : string) => { 
                const record = A.copy (state.record)
                const currentKeyLog = state.record[state.Q_n][state.input_n]
                if (currentKeyLog.status === 'waiting') {
                    if (currentKeyLog.key === inputKey) {
                        record[state.Q_n][state.input_n] = {status:'correct', key:currentKeyLog.key}
                        return record
                    }
                    else {
                        record[state.Q_n][state.input_n] = {status:'typo', key:currentKeyLog.key}
                        return record 
                    }
                }
                else {
                    if (currentKeyLog.key === inputKey && currentKeyLog.status === 'typo') { 
                        record[state.Q_n][state.input_n] = {status:'incorrect', key:currentKeyLog.key}
                        return record 
                    }
                    else { 
                        return record
                    }
                }
            }
            const nextRe = nextRecord(key)
            if (code[state.input_n] === key)  {
                if (state.input_n + 1 === code.length) { 
                    if (state.Q_n + 1 === state.questions.length) { 
                        setState({
                            key : state.key + key,
                            questions : state.questions,
                            record : nextRe, 
                            Q_n : state.Q_n,
                            input_n: state.input_n + 1,
                            typo : false,
                            finished : true
                        })
                        setResult(
                            {
                                questions: state.questions,
                                records: nextRe,
                                accurasy : (typeN - typoN) / typeN
                            } 
                        )
                        console.log("finish")
                    } else { 
                        setState({
                            key : "",
                            questions : state.questions,
                            record : nextRe,
                            Q_n : state.Q_n + 1,
                            input_n: 0,
                            typo : false,
                            finished : false
                        }) 
                    }
                } else {
                    setState({
                        key : state.key + key,
                        questions : state.questions,
                        record : nextRe,
                        Q_n : state.Q_n,
                        input_n: state.input_n + 1,
                        typo : false,
                        finished : false
                    })
                } 
            } 
            else { 
                setTypoN(typoN+1)
                setState({
                    key : state.key,
                    questions : state.questions,
                    record : nextRe,
                    Q_n : state.Q_n,
                    input_n: state.input_n,
                    typo : true,
                    finished : false
                })
            }

        }
    }

    return { state, handleKey }
}