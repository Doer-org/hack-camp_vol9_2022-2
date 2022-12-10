
import { Link } from "react-router-dom";
import { ModeSelect } from "../game/ModeSelect";
 
  
export const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <h2><Link to='/game/mode-select'>Game</Link> </h2>
            
            <h2>Code Review</h2>
            {/* <CharacterCounter /> */}
        </div>
    )
}