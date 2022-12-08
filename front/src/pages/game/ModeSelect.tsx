import * as O from 'fp-ts/Option'
import { Link } from "react-router-dom";
export const ModeSelect = () => {  
    return (
        <div>
            <h1>ModeSelect</h1>
            <h2><Link to ='/game/practice/one-linear'>Practice</Link></h2>
            <h2><Link to ='/game/multiplayer/create-room'>Multiplayer</Link></h2>
           
        </div>
    )
}