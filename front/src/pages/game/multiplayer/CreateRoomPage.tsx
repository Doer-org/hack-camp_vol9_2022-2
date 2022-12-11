import React, { useState } from "react";
import { Button, Modal } from "react-daisyui";
import { useCopyToClipboard } from "usehooks-ts";
import { useRoomApi } from "@/hooks/useRoomApi";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { useRoomInfoStore } from "@/store/RoomInfoStore";

interface Props {}

const CreateRoomPage: React.FC<Props> = () => {
  const { roomInfo, setRoomInfo } = useRoomInfoStore();
  const [value, copyToClipboard] = useCopyToClipboard();
  const roomAPI = useRoomApi();
  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1 className="text-white text-center text-5xl">Create Room</h1>
        <div className="mt-7">
          <span className="text-white mr-5">ルーム名</span>
          <input
            type="text"
            defaultValue={roomInfo.roomName}
            onChange={(e) =>
              setRoomInfo({
                roomId: roomInfo.roomId,
                roomName: e.target.value,
              })
            }
          />
        </div>
        {/* <p>{`http://127.0.0.1:5173/game/multiplayer/prepare-room?room_id=${roomInfo.roomId}`}</p> */}
        <Button
          color="primary"
          onClick={() => {
            pipe(
              roomAPI.postCreateRoom({
                room_name: roomInfo.roomName,
                max_count: 3,
              }),
              TE.match(
                (e) => console.log(e),
                (ok) =>
                  setRoomInfo({
                    roomId: ok.room_id,
                    roomName: ok.room_name,
                  })
              )
            )();
            copyToClipboard(
              `http://127.0.0.1:5173/game/multiplayer/prepare-room?room_id=${roomInfo.roomId}`
            );
          }}
        >
          ルームURL発行
        </Button>
        <p>
          一緒に遊ぶ人に
          <a
            href={`http://127.0.0.1:5173/game/multiplayer/prepare-room?room_id=${roomInfo.roomId}`}
          >
            リンク
          </a>
          を教えましょう！
        </p>
      </div>
    </div>
  );
};

export default CreateRoomPage;
