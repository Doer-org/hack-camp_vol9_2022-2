import { useState } from 'react'
import {useKey} from 'react-use'
import reactLogo from '@/assets/react.svg'
import PracticeOneLinear from '@/pages/game/practice/OneLinear'
import { Routing } from './Routing'  

function App() {  
  return (
    <div className="App bg-slate-800 h-full" >    
        <Routing /> 
    </div>
  )
} 
export default App
