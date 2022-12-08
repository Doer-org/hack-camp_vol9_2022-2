import * as O from 'fp-ts/Option'
import '@/App.css'
import '@/hooks/useSinglePlayerGame'
import useSinglePlayerGame from '@/hooks/useSinglePlayerGame'
import { useEventListener } from 'usehooks-ts'

interface Props {

}

const PracticeOneLinear: React.FC<Props> = () => { 
    const keyPress = (handler : ((key: string) => void)) => (e : any) => {  
      const key : string = e.key
      handler(key)
    }  
    const { state, handleKey } = useSinglePlayerGame() 
    useEventListener('keydown', keyPress(handleKey))
    console.log(state)
    return (
      <>  
        {/* {state.questions.map((q, i) => <h1 key={i}>{q.codes[0]}</h1>)} */
          state.Q_n === state.questions.length - 1 
            && state.input_n === state.questions[state.Q_n].codes[0].length //- 1 
            ? <>  
                <h1>finish</h1>  
              </>
            : <> 
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
                <h2>{state.questions[state.Q_n].tips}</h2>  
                <h1>n: {state.input_n}</h1> 
              </> 
        }
      </>
    )
}

export default PracticeOneLinear