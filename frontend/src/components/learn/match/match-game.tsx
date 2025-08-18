"use client";
import { MatchGrid } from ".";
import { useState } from "react";

useState;

export const MatchGame = ({ setId }: { setId: number }) => {
  const [gameStart, setGameStart] = useState<boolean>(false);

  if (setId === -1) {
    return (
      <div className="w-full bg-white h-full rounded-2xl drop-shadow-xl flex items-center justify-center">
        <h1>Set Not Found</h1>
      </div>
    );
  }

  return (
    <div className="w-full bg-white h-full rounded-2xl drop-shadow-xl flex items-center justify-center">
      {!gameStart ? (
        <div className="flex flex-col text-4xl items-center gap-10">
          {/* Match Game Icon */}
          <div className="flex items-center justify-center w-[100px] h-[100px] relative">
            <div className="absolute bg-laker-gold opacity-20 w-full h-full rounded-2xl"></div>
            <img
              src="/utility/trophyIcon2.svg"
              alt="Trophy Icon"
              className="w-[50px] h-[50px]"
            />
          </div>

          {/* Match Game Title */}
          <h1 className="text-laker-purple font-semibold">Match Game</h1>

          {/* Choose Number of Cards */}
          <div className="flex flex-col gap-6 p-4 rounded-2xl drop-shadow-xl">
            <h2 className="text-2xl ">Choose Number of Cards</h2>
            <input type="range" min="1" max="16" className="range-slider" />
          </div>

          {/* Start button */}
          <button
            className="bg-laker-gold px-9 py-3 rounded-2xl text-white cursor-pointer hover:bg-[#E0A322] duration-300"
            onClick={() => setGameStart(true)}
          >
            Start
          </button>
        </div>
      ) : (
        <div className="w-full h-full p-10 flex flex-col gap-4 pt-5">
          <div className="flex justify-between">
            <button onClick={() => setGameStart(false)}>back</button>
            <div>Timer</div>
            <div>High Score:</div>
          </div>
          <div className="w-full">
            <MatchGrid setId={setId}/>
          </div>
        </div>
      )}
    </div>
  );
};
