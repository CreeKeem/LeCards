"use client";

import { Footer } from "@/components/navigation";
import { SetDto } from "@/types/sets";
import { useEffect, useState } from "react";
import { fetchSetById } from "@/api/set";
import { fetchSetUserCardInfo } from "@/api/user-card-info";
import { FlashcardList, LearningStatus } from "@/components/flashcard";
import { useRouter, useParams } from "next/navigation";
import { fetchUserSetInfo, updateUserSetInfo } from "@/api/user-set-info";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function Study() {
  const [set, setSet] = useState<SetDto>();
  const [userSetColor, setUserSetColor] = useState<string>("");
  const [cardsMastered, setCardsMastered] = useState(0);
  const [cardsLearned, setCardsLearned] = useState(0);
  const [cardsStudying, setCardsStudying] = useState(0);
  const router = useRouter();
  const params = useParams();
  const setId = params?.setId;

  useEffect(() => {
    const getSetAndStats = async () => {
      if (!setId) return;

      const set = await fetchSetById(+setId);
      const setInfo = await fetchUserSetInfo(1, +setId);
      if (set) {
        setSet(set);
      } else {
        return;
      }
      if (setInfo) {
        console.log(setInfo.color);
        setUserSetColor(setInfo.color);
      } else return;

      const userCardInfo = await fetchSetUserCardInfo(1, +setId);
      let mastered = 0;
      let learned = 0;
      let studying = 0;
      if (userCardInfo) {
        for (let i = 0; i < userCardInfo.length; i++) {
          if (userCardInfo[i].learningStatus === LearningStatus.NOT_LEARNED) {
            studying++;
          } else if (
            userCardInfo[i].learningStatus === LearningStatus.LEARNING
          ) {
            learned++;
          } else {
            mastered++;
          }
        }
      }

      setCardsMastered(mastered);
      setCardsLearned(learned);
      setCardsStudying(studying);
      const update = await updateUserSetInfo({
        userId: 1,
        setId: +setId,
        lastAccess: new Date(),
      });
      if (!update) return;
    };

    getSetAndStats();
  }, []);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleProfileClick = () => {
    router.push(`/profile/${1}/${slugify("LeBron James")}`);
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center py-10 bg-[#F9FAFB] gap-8">
        {/* Author */}
        <div className="w-full max-w-[1216px]">
          <button
            className="flex items-center gap-2 sm:gap-3  p-2 px-3 rounded-2xl drop-shadow-lg hover:bg-gray-100 duration-100 cursor-pointer justify-center"
            onClick={handleProfileClick}
          >
            <img
              src="/Lebron.svg"
              alt="User Profile"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col items-baseline">
              <h2 className="text-s">Created by LeBron James</h2>
              <h2 className="text-xs">
                Created{" "}
                {set?.createdAt
                  ? new Date(set.createdAt).toLocaleDateString("en-US", options)
                  : ""}
              </h2>
            </div>
          </button>
        </div>
        {/* Set Overview */}
        <div className="flex flex-col w-full max-w-[1216px] bg-white h-[180px] p-6 rounded-2xl drop-shadow-lg gap-8">
          {/* Heading */}
          <div className="flex justify-between">
            <h1 className="font-semibold text-xl">Set Overview</h1>
            <h2 className="bg-laker-gold text-laker-purple px-2 rounded-2xl">
              {set?.numCards} cards
            </h2>
          </div>
          {/* Stats */}
          <div className="flex justify-around items-center w-full text-[#374151]">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-laker-purple">
                {cardsMastered}
              </h1>
              <h2>Mastered</h2>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-laker-gold">
                {cardsLearned}
              </h1>
              <h2>Studied</h2>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">{cardsStudying}</h1>
              <h2>Remaining</h2>
            </div>
          </div>
        </div>

        {/* Four Options: Learn, Flashcards, Quiz, Match */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-[1248px] px-4">
          {/* Learn */}
          <div className="bg-laker-purple rounded-2xl text-white flex flex-col items-center justify-center cursor-pointer h-[164px] gap-1 hover:bg-[#7831B7] duration-300">
            <div className="flex items-center justify-center w-[48px] h-[48px] relative">
              <div className="absolute bg-white opacity-20 w-full h-full rounded-2xl"></div>
              <img src="/learnIcon.svg" alt="Learn Icon" />
            </div>
            <h1 className="font-semibold text-xl">Learn</h1>
            <h2 className="text-sm">Study Mode</h2>
          </div>

          {/* Flashcards */}
          <div className="bg-laker-gold rounded-2xl text-laker-purple flex flex-col items-center justify-center cursor-pointer h-[164px] gap-1 hover:bg-[#E0A322] duration-300">
            <div className="flex items-center justify-center w-[48px] h-[48px] relative">
              <div className="absolute bg-laker-purple opacity-20 w-full h-full rounded-2xl"></div>
              <img src="/flashcardIcon.svg" alt="Flashcard Icon" />
            </div>
            <h1 className="font-semibold text-xl">Flashcards</h1>
            <h2 className="text-sm">Flip & Review</h2>
          </div>

          {/* Quiz */}
          <div className="bg-white border-laker-purple border-2 rounded-2xl text-laker-purple flex flex-col items-center justify-center cursor-pointer h-[164px] gap-1 hover:bg-[#5625831c] duration-300">
            <div className="flex items-center justify-center w-[48px] h-[48px] relative">
              <div className="absolute bg-laker-purple opacity-20 w-full h-full rounded-2xl"></div>
              <img src="/quizIcon.svg" alt="Quiz Icon" />
            </div>
            <h1 className="font-semibold text-xl">Quiz</h1>
            <h2 className="text-sm">Test Yourself</h2>
          </div>

          {/* Match */}
          <div className="bg-white border-laker-gold border-2 rounded-2xl text-laker-gold flex flex-col items-center justify-center cursor-pointer h-[164px] gap-1 hover:bg-[#fdb9271c] duration-300">
            <div className="flex items-center justify-center w-[48px] h-[48px] relative">
              <div className="absolute bg-laker-gold opacity-20 w-full h-full rounded-2xl"></div>
              <img src="/trophyIcon2.svg" alt="Trophy Icon" />
            </div>
            <h1 className="font-semibold text-xl">Match</h1>
            <h2 className="text-sm">Memory Game</h2>
          </div>
        </div>

        <FlashcardList setId={+setId!} edit={false} />
      </div>
      <Footer />
    </div>
  );
}
