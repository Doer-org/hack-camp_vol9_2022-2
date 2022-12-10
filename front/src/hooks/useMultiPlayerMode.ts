import { useResultStore } from '@/store/ResultStore'
import { GameState, Question } from '@/types/Game'
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

module MultiplayEffect {
  export const capsLock = (key : string) => {    
    const u = key.toUpperCase()
    return (
      key === u ? key.toLowerCase() : u    
    )
  }
}

const nextRecord = (state :GameState , inputKey: string) => {
  const record = A.copy(state.record)
  const currentKeyLog = state.record[state.Q_n][state.input_n]
  if (currentKeyLog.status === 'waiting') {
    if (currentKeyLog.key === inputKey) {
      record[state.Q_n][state.input_n] = { status: 'correct', key: currentKeyLog.key }
      return record
    }
    else {
      record[state.Q_n][state.input_n] = { status: 'typo', key: currentKeyLog.key }
      return record
    }
  }
  else {
    if (currentKeyLog.key === inputKey && currentKeyLog.status === 'typo') {
      record[state.Q_n][state.input_n] = { status: 'incorrect', key: currentKeyLog.key }
      return record
    }
    else {
      return record
    }
  }
}
const initQuestions = [
  { codes: "printfn \"Hello World\"", tips: "Hello Worldを出力する", language: "F#" },
  { codes: "[1..10] |> List.map(fun x -> 2 * x)", tips: "1から10の整数のリストの要素を2倍する．", language: "F#" },
]

// ？？？？？？？？？？？？？？？？
const initState = ()  : GameState =>  {
  return  {
    lastKeyInput: "",
    questions: initQuestions,
    record: pipe(
      initQuestions,
      A.map((question) => question.codes.split('').map((v, i) => {
        return { status: 'waiting', key: v } }))
    ),
    Q_n: 0,
    input_n: 0,
    typo: false,
    finished: false

  }
}
 
type EffectState = {
  CapsLock : boolean
}
const initEffectState  = {
  CapsLock : false
}

export default (): {
  state: GameState
  effectState : EffectState
  handleKey: (key: string) => void
  capsLockEffect: () => void
  initStates : () => void
} => { 
  const [ typeN, setTypeN ] = useState(0)
  const [ typoN, setTypoN ] = useState(0)
  const { setResult } = useResultStore() 

  const [ state, setState ] = useState<GameState>(initState())  // なんで？
  const [ effectState, setEffectState ] = useState<EffectState>(initEffectState)
  
  const capsLockEffect = () => 
    setEffectState((e) => ({
      CapsLock : !e.CapsLock
    }))
    
  const inputAttack = (key : string) =>  
    effectState.CapsLock ? MultiplayEffect.capsLock(key) : key   

  const initStates = () : void => {
    console.log('-----------------------------')
    console.log(initState())
    setState(initState())
    setEffectState(initEffectState) 
  }

  const handleKey = (inputKey: string) => { 
    const key = inputAttack(inputKey)  
    if (key.length === 1) { 
      const question = state.questions[state.Q_n]
      const code = question.codes  
      const isCorrectInput = code[state.input_n] === key
      const isLastQuestion = state.Q_n + 1 === state.questions.length
      const isLastKey = state.input_n + 1 === code.length 
      const nextRe  = nextRecord(state, key)
      setState({
        lastKeyInput: key,
        questions: state.questions,
        record: nextRe,
        Q_n: (isCorrectInput && !isLastQuestion &&  isLastKey) ? state.Q_n + 1 : state.Q_n,
        input_n: 
          (isCorrectInput && isLastKey) ? 0 
          : (!isCorrectInput) ? state.input_n
          : state.input_n + 1, 
        typo: isCorrectInput,
        finished: isCorrectInput && isLastQuestion && isLastKey
      }) 
      setTypeN((state) => state+1)
      setTypoN((state) => isCorrectInput?state:state+1)
      if (isCorrectInput && isLastQuestion && isLastKey) { 
        setResult(
          {
            questions: state.questions,
            records: nextRe,
            accurasy: (typeN - typoN) / typeN
          }
        )
      } 
    }
  } 
  // 受けた攻撃を反映するフック 
  return { state, effectState, handleKey, capsLockEffect, initStates }
}