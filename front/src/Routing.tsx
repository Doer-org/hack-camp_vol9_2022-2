import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/home'
import PracticeOneLinear from '@/pages/game/practice/OneLinear'
import { ModeSelect } from '@/pages/game/ModeSelect'
import CreateRoomPage from '@/pages/game/multiplayer/CreateRoomPage'
import Prepare from '@/pages/game/multiplayer/Prepare'
import MultiplayerOneLinear from '@/pages/game/multiplayer/MultiplayerOneLinear'
import ResultPage from '@/pages/game/multiplayer/ResultPage'
export const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/game/practice/one-linear' element={<PracticeOneLinear />} />
          <Route path='/game/mode-select' element={<ModeSelect />} />
          <Route path='/game/multiplayer/create-room' element={<CreateRoomPage/>} />
          <Route path='/game/multiplayer/prepare-room' element={<Prepare/>} />
          <Route path='/game/multiplayer/room' element={<MultiplayerOneLinear/>} />
          <Route path='/game/multiplayer/room/result' element={<ResultPage/>} /> 
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}