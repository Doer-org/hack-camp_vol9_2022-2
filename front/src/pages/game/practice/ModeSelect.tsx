import * as O from "fp-ts/Option";
import { Link } from "react-router-dom";
export const ModeSelect = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="text-white text-5xl">ModeSelect</h1>
        <div className="mt-10">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 w-48 hover:border-blue-500 rounded">
            <Link className="text-white" to="/game/practice/one-linear">
              Practice
            </Link>
          </button>
        </div>
        <div className="mt-5">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded w-48 focus:outline-none disabled:opacity-50"
            disabled
          >
            Multiplayer
            {/* <Link className="text-white" to="/game/multiplayer/create-room">
              Multiplayer
            </Link> */}
          </button>
        </div>
      </div>
    </div>
  );
};
