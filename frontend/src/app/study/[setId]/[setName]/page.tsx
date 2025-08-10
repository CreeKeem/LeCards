"use client";

import { Footer, SideNavbar } from "@/components/navigation";
import { SetDto } from "@/types/sets";
import { useEffect, useState } from "react";
import { fetchSetById } from "@/api/set";
import { fetchSetUserCardInfo } from "@/api/user-card-info";
import { FlashcardList, LearningStatus } from "@/components/flashcard";
import { useRouter, useParams } from "next/navigation";
import { fetchUserSetInfo, updateUserSetInfo } from "@/api/user-set-info";
import { useAuthGuard } from "@/hooks/useAuthGuard";

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
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const setId = params?.setId;
  const { isAuthenticated, userInfo } = useAuthGuard();

  useEffect(() => {
    if (!isAuthenticated || !setId) return;

    const getSetAndStats = async () => {
      try {
        const [set, setInfo, userCardInfo] = await Promise.all([
          fetchSetById(+setId),
          fetchUserSetInfo(+setId),
          fetchSetUserCardInfo(+setId),
        ]);

        if (set) {
          setSet(set);
        } else {
          router.push("/dashboard");
          return;
        }

        if (setInfo) {
          console.log(setInfo.color);
          setUserSetColor(setInfo.color);
        }

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

        // Update last access time
        await updateUserSetInfo({
          setId: +setId,
          lastAccess: new Date(),
        });
      } catch (error) {
        console.error("Error fetching set data:", error);
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    getSetAndStats();
  }, [isAuthenticated, setId, router]);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleProfileClick = () => {
    if (userInfo) {
      router.push(
        `/profile/${userInfo.userId}/${slugify(
          `${userInfo.fName} ${userInfo.lName}`
        )}`
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-laker-purple mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading study set...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex">
        <SideNavbar />
        <div className="min-h-screen flex flex-col items-center py-10 bg-[#F9FAFB] gap-8 w-full">
          {/* Author */}
          <div className="w-full max-w-[1216px]">
            <button
              className="flex items-center gap-2 sm:gap-3 p-2 px-3 rounded-2xl drop-shadow-lg hover:bg-gray-100 duration-100 cursor-pointer justify-center"
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
                <h2 className="text-s">
                  Created by {userInfo?.fName} {userInfo?.lName}
                </h2>
                <h2 className="text-xs">
                  Created{" "}
                  {set?.createdAt
                    ? new Date(set.createdAt).toLocaleDateString(
                        "en-US",
                        options
                      )
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
                <img src="/set/learnIcon.svg" alt="Learn Icon" />
              </div>
              <h1 className="font-semibold text-xl">Learn</h1>
              <h2 className="text-sm">Study Mode</h2>
            </div>

            {/* Flashcards */}
            <div className="bg-laker-gold rounded-2xl text-laker-purple flex flex-col items-center justify-center cursor-pointer h-[164px] gap-1 hover:bg-[#E0A322] duration-300">
              <div className="flex items-center justify-center w-[48px] h-[48px] relative">
                <div className="absolute bg-laker-purple opacity-20 w-full h-full rounded-2xl"></div>
                <img src="/set/flashcardIcon.svg" alt="Flashcard Icon" />
              </div>
              <h1 className="font-semibold text-xl">Flashcards</h1>
              <h2 className="text-sm">Flip & Review</h2>
            </div>

            {/* Quiz */}
            <div className="bg-white border-laker-purple border-2 rounded-2xl text-laker-purple flex flex-col items-center justify-center cursor-pointer h-[164px] gap-1 hover:bg-[#5625831c] duration-300">
              <div className="flex items-center justify-center w-[48px] h-[48px] relative">
                <div className="absolute bg-laker-purple opacity-20 w-full h-full rounded-2xl"></div>
                <img src="/set/quizIcon.svg" alt="Quiz Icon" />
              </div>
              <h1 className="font-semibold text-xl">Quiz</h1>
              <h2 className="text-sm">Test Yourself</h2>
            </div>

            {/* Match */}
            <div className="bg-white border-laker-gold border-2 rounded-2xl text-laker-gold flex flex-col items-center justify-center cursor-pointer h-[164px] gap-1 hover:bg-[#fdb9271c] duration-300">
              <div className="flex items-center justify-center w-[48px] h-[48px] relative">
                <div className="absolute bg-laker-gold opacity-20 w-full h-full rounded-2xl"></div>
                <img src="/utility/trophyIcon2.svg" alt="Trophy Icon" />
              </div>
              <h1 className="font-semibold text-xl">Match</h1>
              <h2 className="text-sm">Memory Game</h2>
            </div>
          </div>

          <FlashcardList setId={+setId!} edit={false} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
