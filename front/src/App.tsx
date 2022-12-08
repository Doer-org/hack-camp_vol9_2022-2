import { useState } from 'react'
import {useKey} from 'react-use'
import reactLogo from '@/assets/react.svg'
import PracticeOneLinear from '@/pages/game/practice/OneLinear'
import { Routing } from './Routing'
import {
  RecoilRoot
} from 'recoil';

// import './App.css'
// import '@/hooks/useSinglePlayerGame'
// import useSinglePlayerGame from '@/hooks/useSinglePlayerGame'
// import { useEventListener } from 'usehooks-ts'

function App() {  
  return (
    <div className="App" >   
      <RecoilRoot>
        <Routing />
      </RecoilRoot> 
    </div>
  )
} 
export default App
