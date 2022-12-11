import { useResultStore } from "@/store/ResultStore";
import { useRoomInfoStore } from "@/store/RoomInfoStore";
import { useUserInfoStore } from "@/store/UserInfoStore";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

/*
    サーバから結果を取得．表示 
    コード評価
*/

interface Props {}

const ResultPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserInfoStore();
  const { roomInfo, setRoomInfo } = useRoomInfoStore();
  const { result, setResult } = useResultStore();

  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1 className="text-5xl text-center text-white mb-5">Result</h1>
        {/* <h2>ランキング</h2> */}

        {/* <p className="text-white text-xl">精度： {result.accurasy * 100} %</p> */}

        <h2 className="text-white text-xl">出題リスト</h2>
        <>
          {result.records.map((record, _) => (
            <>
              <h3 className="mt-2">
                {" "}
                {record.map((v, i) => {
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
              </h3>
            </>
          ))}
          {/* 同じルームIDで */}
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 w-48 hover:border-blue-500 rounded mt-5"
            onClick={() => navigate("/")}
          >
            もう一度遊ぶ
          </button>
        </>
      </div>
    </div>
  );
};

export default ResultPage;
