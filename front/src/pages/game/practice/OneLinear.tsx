import * as O from "fp-ts/Option";
import "@/App.css";
import "@/hooks/useSinglePlayerGame";
import useSinglePlayerGame from "@/hooks/useSinglePlayerGame";
import { useEventListener } from "usehooks-ts";
// import {KeyLog , GameState} from '@/types/Game'
import useMultiplayerOneLinear from "@/hooks/useMultiPlayerMode";
import { useNavigate } from "react-router-dom";

interface Props {}

const PracticeOneLinear: React.FC<Props> = () => {
  const navigate = useNavigate();
  const keyPress = (handler: (key: string) => void) => (e: any) => {
    const key: string = e.key;
    handler(key);
  };
  // const { state, handleKey } = useSinglePlayerGame()

  const {
    state,
    effectState,
    handleKey,
    capsLockEffect,
    initStates,
  } = useMultiplayerOneLinear();
  useEventListener("keydown", keyPress(handleKey));
  console.log(state);
  return (
    <div className="flex justify-center items-center h-full">
      <div className="border p-10 border-violet-400 border-4 border-dashed">
        {
          /* {state.questions.map((q, i) => <h1 key={i}>{q.codes[0]}</h1>)} */
          state.Q_n === state.questions.length - 1 &&
          state.input_n === state.questions[state.Q_n].codes.length ? ( //- 1
            <>
              <h1>finish</h1>
            </>
          ) : (
            <>
              <p className="text-center text-white mb-5 text-xl">
                {state.Q_n + 1} / {state.questions.length}{" "}
              </p>
              <h1 className="text-6xl">
                {state.record[state.Q_n].map((v, i) => {
                  if (v.status === "waiting") {
                    return (
                      <span
                        style={{ color: "gray", backgroundColor: "green" }}
                        key={i}
                      >
                        {v.key}
                      </span>
                    );
                  } else if (v.status === "correct") {
                    return (
                      <span style={{ color: "white" }} key={i}>
                        {v.key}
                      </span>
                    );
                  } else if (v.status === "incorrect") {
                    return (
                      <span style={{ color: "red" }} key={i}>
                        {v.key}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        style={{ color: "darkred", backgroundColor: "green" }}
                        key={i}
                      >
                        {v.key}
                      </span>
                    );
                  }
                })}
              </h1>

              <div className="mt-10">
                <p className="text-white">
                  Language: {state.questions[state.Q_n].language},{" "}
                </p>
                <p className="text-white">
                  Tips: {state.questions[state.Q_n].tips}
                </p>
                <p className="text-white">
                  last input : '{state.lastKeyInput}'
                </p>
                {state.finished ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 w-48 hover:border-blue-500 rounded mt-5"
                    onClick={() => navigate("/game/multiplayer/room/result")}
                  >
                    結果を見る
                  </button>
                ) : null}
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

export default PracticeOneLinear;
