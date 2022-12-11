import { useResultStore } from "@/store/ResultStore";
import { GameState, Question } from "@/types/Game";
import React, { useState, useEffect } from "react";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/lib/function";
import { string } from "prop-types";

/*
  問題文表示
    次入力されるべき文字を強調表示
    キー入力に対して正誤判定，
        正解なら次の文字へ(総入力数+1)，不正解なら誤入力数+1 
    全文字入力完了したら，
        次の問題があれば次の問題へ，なければ終了し結果を表示
*/

module MultiplayEffect {
  export const capsLock = (key: string) => {
    const u = key.toUpperCase();
    return key === u ? key.toLowerCase() : u;
  };
}

const nextRecord = (state: GameState, inputKey: string) => {
  const record = A.copy(state.record);
  const currentKeyLog = state.record[state.Q_n][state.input_n];
  if (currentKeyLog.status === "waiting") {
    if (currentKeyLog.key === inputKey) {
      record[state.Q_n][state.input_n] = {
        status: "correct",
        key: currentKeyLog.key,
      };
      return record;
    } else {
      record[state.Q_n][state.input_n] = {
        status: "typo",
        key: currentKeyLog.key,
      };
      return record;
    }
  } else {
    if (currentKeyLog.key === inputKey && currentKeyLog.status === "typo") {
      record[state.Q_n][state.input_n] = {
        status: "incorrect",
        key: currentKeyLog.key,
      };
      return record;
    } else {
      return record;
    }
  }
};

const initQuestions = [
  {
    codes: 'printfn "Hello World"',
    tips: "Hello Worldを出力する",
    language: "F#",
  },
  {
    codes: "[1..10] |> List.map(fun x -> 2 * x)",
    tips: "1から10の整数のリストの要素を2倍する．",
    language: "F#",
  },
  {
    codes: "let isEven n = n % 2 = 0",
    tips: "偶奇を調べる",
    language: "F#",
  },

  {
    codes: "let alphabet = 'a' :: ['b'..'z']",
    tips: "先頭に要素を追加して，a, b, c, ..., zのリストをつくる．",
    language: "F#",
  },
  {
    codes: "[1..10] |> List.map(fun x -> x * 2)",
    tips: "1から10の整数のリストの要素を2倍する．",
    language: "F#",
  },
  {
    codes: "let ALPHABET = ['A'; 'B'; 'C'] @ ['D'..'Z']",
    tips: "リストを結合して，A, B, C, ..., Zのリストをつくる．",
    language: "F#",
  },
  {
    codes: "let alphabet = 'a' :: ['b'..'z']",
    tips: "先頭に要素を追加して，a, b, c, ..., zのリストをつくる．",
    language: "F#",
  },
  {
    codes:
      "[1..10] |> List.filter(fun x -> x % 2 = 0) |> List.map(fun x -> pown x 2)",
    tips: "整数のリストから偶数を抽出して，2乗する．",
    language: "F#",
  },
  {
    codes: "let rec fact n = match n with | 0 -> 1 | _ -> n * fact (n-1)",
    tips: "階乗関数を再帰的に定義",
    language: "F#",
  },
  {
    codes:
      "let rec factCps n cont = match n with | 0 -> cont 1 | _ -> factCps (n-1) (fun m -> n * m |> cont )",
    tips:
      "継続渡しスタイル(Continuation Passing Style)の階乗関数 8! = factCps 8 id",
    language: "F#",
  },
  {
    codes: '["Hello"; "F#"; "World"] |> List.reduce(fun a b -> a + " " + b)',
    tips: 'リスト中の文字列を結合する（"Hello F# World"）',
    language: "F#",
  },
  {
    codes: "[for i in 1..5 -> pown i i]",
    tips: "1^1, 2^2, ..., 5^5 のリストを内包表記で作る",
    language: "F#",
  },
  {
    codes: "Set.intersect (set [1; 2; 3]) (set [2; 3; 4])",
    tips: "積集合を求める（set [2; 3]）",
    language: "F#",
  },
  {
    codes: "[for i in 1..9 -> [for j in 1..9 -> i * j]]",
    tips: "九九表を作る",
    language: "F#",
  },
];

// ？？？？？？？？？？？？？？？？
const initState = (): GameState => {
  return {
    lastKeyInput: "",
    questions: initQuestions,
    record: pipe(
      initQuestions,
      A.map((question) =>
        question.codes.split("").map((v, i) => {
          return { status: "waiting", key: v };
        })
      )
    ),
    Q_n: 0,
    input_n: 0,
    typo: false,
    finished: false,
  };
};

type EffectState = {
  CapsLock: boolean;
};
const initEffectState = {
  CapsLock: false,
};

export default (): {
  state: GameState;
  effectState: EffectState;
  handleKey: (key: string) => void;
  capsLockEffect: () => void;
  initStates: () => void;
} => {
  const [typeN, setTypeN] = useState(0);
  const [typoN, setTypoN] = useState(0);
  const { setResult } = useResultStore();

  const [state, setState] = useState<GameState>(initState()); // なんで？
  const [effectState, setEffectState] = useState<EffectState>(initEffectState);

  const capsLockEffect = () =>
    setEffectState((e) => ({
      CapsLock: !e.CapsLock,
    }));

  const inputAttack = (key: string) =>
    effectState.CapsLock ? MultiplayEffect.capsLock(key) : key;

  const initStates = (): void => {
    console.log("-----------------------------");
    console.log(initState());
    setState(initState());
    setEffectState(initEffectState);
  };

  const handleKey = (inputKey: string) => {
    const key = inputAttack(inputKey);
    if (key.length === 1) {
      const question = state.questions[state.Q_n];
      const code = question.codes;
      const isCorrectInput = code[state.input_n] === key;
      const isLastQuestion = state.Q_n + 1 === state.questions.length;
      const isLastKey = state.input_n + 1 === code.length;
      const nextRe = nextRecord(state, key);
      setState({
        lastKeyInput: key,
        questions: state.questions,
        record: nextRe,
        Q_n:
          isCorrectInput && !isLastQuestion && isLastKey
            ? state.Q_n + 1
            : state.Q_n,
        input_n:
          isCorrectInput && isLastKey
            ? 0
            : !isCorrectInput
            ? state.input_n
            : state.input_n + 1,
        typo: isCorrectInput,
        finished: isCorrectInput && isLastQuestion && isLastKey,
      });
      setTypeN((state) => state + 1);
      setTypoN((state) => (isCorrectInput ? state : state + 1));
      if (isCorrectInput && isLastQuestion && isLastKey) {
        setResult({
          questions: state.questions,
          records: nextRe,
          accurasy: (typeN - typoN) / typeN,
        });
      }
    }
  };
  // 受けた攻撃を反映するフック
  return { state, effectState, handleKey, capsLockEffect, initStates };
};
