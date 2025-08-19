"use client";
import { useRouter } from "next/navigation";
import { MatchGrid } from ".";
import { useState } from "react";

useState;

export const MatchGame = ({
  setId,
  setName,
}: {
  setId: number;
  setName: string;
}) => {
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const router = useRouter();

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleWin = () => {
    setGameStart(false);
    setWin(true);
  };

  const handleStart = () => {
    setWin(false);
    setGameStart(true);
  };

  if (setId === -1) {
    return (
      <div className="w-full bg-white h-full rounded-2xl drop-shadow-xl flex items-center justify-center">
        <h1>Set Not Found</h1>
      </div>
    );
  }

  if (gameStart) {
    return (
      <div className="w-full bg-white h-full rounded-2xl drop-shadow-xl flex items-center justify-center flex flex-col gap-5">
        <div className="w-full h-full px-8 flex flex-col gap-4 py-3">
          <div className="flex justify-between">
            <button onClick={() => setGameStart(false)}>back</button>
            <div>Timer</div>
            <div>High Score:</div>
          </div>
          <div className="w-full">
            <MatchGrid setId={setId} handleWin={handleWin} />
          </div>
        </div>
      </div>
    );
  }

  if (win) {
    return (
      <div className="w-full bg-white h-full rounded-2xl drop-shadow-xl flex items-center justify-center flex flex-col gap-5">
        <h1 className="font-semibold text-5xl text-laker-purple">You Win!</h1>
        <button
          className="bg-laker-gold px-9 py-3 rounded-2xl text-white cursor-pointer hover:bg-[#E0A322] duration-300 text-xl"
          onClick={handleStart}
        >
          Play Again
        </button>
        <button
          className="bg-laker-purple px-5 py-1 rounded-xl text-white cursor-pointer hover:bg-[#7831B7] duration-300 text-l"
          onClick={() =>
            router.push(`/study/${setId}/${slugify(`${setName}`)}`)
          }
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white h-full rounded-2xl drop-shadow-xl flex items-center justify-center">
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

        {/* Start button */}
        <button
          className="bg-laker-gold px-9 py-3 rounded-2xl text-white cursor-pointer hover:bg-[#E0A322] duration-300"
          onClick={handleStart}
        >
          Start
        </button>
      </div>
    </div>
  );
};
