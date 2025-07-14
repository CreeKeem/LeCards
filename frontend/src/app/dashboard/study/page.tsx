"use client";

import { DashboardNavbar, Footer } from "@/components/navigation";
import { SetInfo } from "@/components/set";
import { useEffect, useState } from "react";
import { fetchSet } from "@/api/set";

export default function Study() {
  const [set, setSet] = useState<SetInfo>();
  const [cardsLearned, setCardsLearned] = useState(0);

  useEffect(() => {
    const getSet = async () => {
      const data = await fetchSet(1);
      if (data) {
        setSet(data);
        setCardsLearned((data.cardsLearned / data.numCards) * 100);
      }
    };
    getSet();
  });

  return (
    <div>
      <DashboardNavbar userName="Lebron" dashboardHome={false} />
      <div className="min-h-screen flex flex-col items-center py-10 bg-[#F9FAFB] gap-8">
        {/* Four Options: Learn, Flashcards, Quiz, Match */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-[1248px] px-4">
          {/* Learn */}
          <div className="bg-laker-purple rounded-2xl text-white flex flex-col items-center justify-center cursor-pointer h-[164px]">
            <div className="flex items-center justify-center w-[48px] h-[48px] relative">
              <div className="absolute bg-white opacity-20 w-full h-full rounded-2xl"></div>
              <img src="/learnIcon.svg" alt="Learn Icon" />
            </div>
            <h1 className="font-semibold text-xl">Learn</h1>
            <h2 className="text-sm">Study Mode</h2>
          </div>

          {/* Flashcards */}
          <div className="bg-laker-gold rounded-2xl text-laker-purple flex flex-col items-center justify-center cursor-pointer h-[164px]">
            <div className="flex items-center justify-center w-[48px] h-[48px] relative">
              <div className="absolute bg-laker-purple opacity-20 w-full h-full rounded-2xl"></div>
              <img src="/flashcardIcon.svg" alt="Flashcard Icon" />
            </div>
            <h1 className="font-semibold text-xl">Flashcards</h1>
            <h2 className="text-sm">Flip & Review</h2>
          </div>

          {/* Quiz */}
          <div className="bg-white border-laker-purple border-2 rounded-2xl text-laker-purple flex flex-col items-center justify-center cursor-pointer h-[164px]">
            <div className="flex items-center justify-center w-[48px] h-[48px] relative">
              <div className="absolute bg-laker-purple opacity-20 w-full h-full rounded-2xl"></div>
              <img src="/quizIcon.svg" alt="Quiz Icon" />
            </div>
            <h1 className="font-semibold text-xl">Quiz</h1>
            <h2 className="text-sm">Test Yourself</h2>
          </div>

          {/* Match */}
          <div className="bg-white border-laker-gold border-2 rounded-2xl text-laker-gold flex flex-col items-center justify-center cursor-pointer h-[164px]">
            <div className="flex items-center justify-center w-[48px] h-[48px] relative">
              <div className="absolute bg-laker-gold opacity-20 w-full h-full rounded-2xl"></div>
              <img src="/trophyIcon2.svg" alt="Trophy Icon" />
            </div>
            <h1 className="font-semibold text-xl">Match</h1>
            <h2 className="text-sm">Memory Game</h2>
          </div>
        </div>

        {/* Set Overview */}
        <div className="flex flex-col w-full max-w-[1216px] bg-white h-[144px] p-6 rounded-2xl drop-shadow-lg gap-4">
          {/* Title */}
          <div className="flex justify-between">
            <h1 className="font-semibold text-xl">Set Overview</h1>
            <h2 className="bg-laker-gold text-laker-purple px-2 rounded-2xl">
              {set?.numCards} cards
            </h2>
          </div>
          {/* Stats */}
          <div className="flex justify-around items-center w-full text-[#374151]">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-laker-purple">{cardsLearned}%</h1>
              <h2>Mastered</h2>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-laker-gold">{cardsLearned}</h1>
              <h2>Studied</h2>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">{cardsLearned}</h1>
              <h2>Remaining</h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
