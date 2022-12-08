
import { Link } from "react-router-dom";
import { ModeSelect } from "../game/ModeSelect";

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
 

// const TextInput = () => { 
//     const [text, setText] = useRecoilState(textState)
//     const onChange = (e : any) => {
//         setText(e.target.value)
//     } 
//     return (
//         <div>
//             <input type="text" value={text} onChange={onChange} />
//             <br />
//             Echo: {text}
//         </div>
//     );
// }

// const charCountState = selector({
//     key: 'charCountState',
//     get: ({get}) => { 
//         const text = get(textState)
//         return text.length
//     }
// })

// const CharacterCount = () => {
//     const count = useRecoilValue(charCountState)
//     return <>Character Count: {count}</>
// }

// const CharacterCounter = () => {
//     return (
//         <>
//             <TextInput />
//             <CharacterCount />
//         </>
//     )
// }
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