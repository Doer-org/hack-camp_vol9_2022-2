import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import {
  parseGameWS,
  createIClientProgress,
  createIClientAction,
  createIClientFinish,
} from "@/util/game";

import useMultiplayerOneLinear from "@/hooks/useMultiPlayerMode";
import { useEventListener } from "usehooks-ts";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-daisyui";
import {
  IClientProgress,
  IClientAction,
  IClientFinish,
  TServerMessageType,
  IServerRanking,
  IServerProgress,
  IServerFinish,
} from "@/types/api/game";
import { useUserInfoStore } from "@/store/UserInfoStore";
import { useRoomInfoStore } from "@/store/RoomInfoStore";
/*
  ゲーム終了 => ResultPageに移動

*/

interface Props {}

const MultiplayerOneLinear: React.FC<Props> = () => {
  const { userInfo, setUserInfo } = useUserInfoStore();
  const { roomInfo, setRoomInfo } = useRoomInfoStore();
  const [socketUrl, setSocketUrl] = useState("ws://localhost:8080/echo");
  const {
    sendMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketUrl);
  const [lastSend, setLastSend] = useState("");

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  const [userId, setUserId] = useState<string>("");
  const {
    state,
    effectState,
    handleKey,
    capsLockEffect,
    initStates,
  } = useMultiplayerOneLinear();
  const [serverFinished, setServerFinished] = useState(false);
  const navigate = useNavigate();

  //
  useEffect(() => {
    console.log("initiate state");
    initStates();
  }, []);

  // とりあえず受け取ったメッセージをコンソール出力する
  useEffect(() => {
    if (lastJsonMessage !== null) {
      const json = JSON.stringify(lastJsonMessage);
      const message = parseGameWS(json);
      pipe(
        message,
        O.match(
          () => console.log("PreparePage"),
          (message) => {
            // いける
            if (message.type === "server_current_ranking") {
              const r: IServerRanking = message;
              console.log(r.data);
            } else if (message.type === "server_user_progress") {
              const p: IServerProgress = message;
              console.log(p.data);
            } else if (message.type === "server_finish") {
              const f: IServerFinish = message;
              console.log(f.data);
              navigate("/game/multiplayer/room/result");
            }
          }
        )
      );
    }
  }, [lastJsonMessage]);

  // キー入力毎に進捗をサーバーに通知
  const keyPress = (updateState: (key: string) => void) => (e: any) => {
    const key: string = e.key;
    updateState(key);
    const data = createIClientProgress({
      user_id: userId,
      Q_n: state.Q_n,
      Q_n_i: state.input_n,
      typo: state.typo,
    });
    setLastSend(JSON.stringify(data));
    sendMessage(JSON.stringify(data));
  };

  useEventListener("keydown", keyPress(handleKey));

  // ゲーム終了時の処理
  useEffect(() => {
    if (state.finished) {
      // サーバーに通知
      const data = createIClientFinish({
        user_id: userId,
      });
      sendMessage(JSON.stringify(data));
      setLastSend(JSON.stringify(data));
    }
  }, [state]);

  // 順位変動
  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1 className="text-center text-3xl mb-7 text-white">
          {roomInfo.roomName} ゲーム画面
        </h1>
        {/* <div className="border p-10 border-violet-400 border-4 border-dashed"> */}
        {/* <p>The WebSocket is currently {connectionStatus}</p> */}
        {/* <div>
          url:
          <input
            type="text"
            size={50}
            defaultValue={socketUrl}
            onChange={(e) => setSocketUrl(e.target.value)}
          />
          <br />
          <h3>send</h3>
          <p>{lastSend}</p>
          <h3>recieved</h3>
          <p>{lastMessage?.data}</p>
          <hr />
        </div> */}
        {/* </div> */}
        {state.finished ? (
          <>
            {serverFinished ? (
              <>
                <h1 className="text-center text-3xl mb-7 text-white">
                  ゲーム終了!
                </h1>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 w-48 hover:border-blue-500 rounded"
                  onClick={() => navigate("/game/multiplayer/room/result")}
                >
                  結果を見る
                </button>
              </>
            ) : (
              <>
                <h1 className="text-center text-xl mb-7 text-white">
                  ゲーム終了を待機
                </h1>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 w-48 hover:border-blue-500 rounded"
                  onClick={() => setServerFinished(true)}
                >
                  server_finish を受信
                </button>
              </>
            )}
          </>
        ) : (
          <div className="border p-10 border-violet-400 border-4 border-dasheda">
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
              <h2 className="text-white">
                last input : '{state.lastKeyInput}'
              </h2>
            </div>
            {/* <>
              <p> capslock : {effectState.CapsLock ? "on" : "off"}</p>
            </>
            <Button onClick={(e) => capsLockEffect()}>caps lock!</Button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplayerOneLinear;
