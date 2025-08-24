"use client";

import { FlashcardDto, FlashcardFlip } from "@/components/flashcard";
import { fetchFlashcardsBySetId } from "@/api/flashcard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronIcon } from "@/components/navigation";
import { LearningStatus } from "@/components/flashcard";
import { updateUserCardInfo } from "@/api/user-card-info";
import { updateCardsLearned } from "@/api/user-set-info";

export const FlashcardLearn = ({
  setId,
  setName,
}: {
  setId: number;
  setName: string;
}) => {
  const [cards, setCards] = useState<FlashcardDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);

  const router = useRouter();

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    const getFlashcards = async () => {
      const data = await fetchFlashcardsBySetId(setId);
      setCards(data);
      setLoading(false);
    };
    getFlashcards();
  }, [setId]);

  const handleDifficulty = async (difficulty: LearningStatus) => {
    const card = cards[index];
    await updateUserCardInfo({
      cardId: card.cardId,
      learningStatus: difficulty,
      lastReviewed: new Date(),
    });
    await updateCardsLearned(setId);
    if (index + 1 < cards.length) {
      setIndex(index + 1);
    }
  };

  const goToPrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const goToNext = () => {
    if (index < cards.length) {
      setIndex(index + 1);
    }
  };

  const handleShuffle = () => {
    const shuffledCards = cards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setIndex(0);
  };

  if (setId === -1) {
    return (
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl drop-shadow-xl flex items-center justify-center">
        <h1>Set Not Found</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl drop-shadow-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-laker-purple mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Fetching Flashcards...</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl drop-shadow-xl flex items-center justify-center">
        <h1>No flashcards found</h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl h-[700px] flex flex-col gap-4">
      {/* Back Button and Card Indicator */}
      <div className="flex items-center relative w-full">
        <span
          className={`text-lg font-medium mx-auto
          ${index >= cards.length && "invisible"}`}
        >
          {index + 1} of {cards.length}
        </span>
      </div>

      {/* Main Flashcard Section */}
      <div className="flex-1 flex items-center justify-center gap-4 min-h-0">
        <button
          className={`flex-shrink-0 h-full max-h-[500px] w-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
            index > 0 ? "hover:bg-gray-300 cursor-pointer" : "invisible"
          }`}
          onClick={goToPrevious}
          disabled={index === 0}
        >
          <ChevronIcon className="h-8 w-8 select-none text-gray-700 rotate-180" />
        </button>

        {index < cards.length ? (
          <div className="flex-1 h-full max-h-[500px]">
            <FlashcardFlip flashcardDto={cards[index]} />
          </div>
        ) : (
          <div className="flex-1 h-full max-h-[500px]">
            <div className="bg-white w-full h-full rounded-2xl shadow-lg flex flex-col items-center justify-center gap-5">
              <h1 className="text-4xl font-semibold">Great Job!</h1>
              <h2 className="text-2xl font-semibold">Would you like to:</h2>
              <div className="flex gap-4">
                <button
                  className="bg-laker-gold text-laker-purple w-35 p-2 rounded-2xl flex items-center justify-center gap-3 cursor-pointer hover:bg-[#E0A322] duration-300"
                  onClick={() => setIndex(0)}
                >
                  <img src="/arrows/arrowPurple.svg" alt="Purple Arrow" />
                  <h3>Start Over</h3>
                </button>
                <button
                  className="bg-laker-purple text-white w-35 p-2 rounded-2xl flex items-center justify-center gap-3 cursor-pointer hover:bg-[#7831B7] duration-300"
                  onClick={handleShuffle}
                >
                  <img src="/utility/shuffleIcon.svg" alt="Shuffle Icon" />
                  <h3>Shuffle</h3>
                </button>
                <button
                  className="text-white w-35 p-2 rounded-2xl flex items-center justify-center gap-3 cursor-pointer bg-red-400 text-white hover:bg-red-500 duration-300"
                  onClick={() =>
                    router.push(`/study/${setId}/${slugify(`${setName}`)}`)
                  }
                >
                  <img
                    src="/utility/hardIcon.svg"
                    alt="X Icon"
                    className="mt-0.5"
                  />
                  <h3>Back</h3>
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          className={`flex-shrink-0 h-full max-h-[500px] w-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
            index < cards.length
              ? "hover:bg-gray-300 cursor-pointer"
              : "invisible"
          }`}
          onClick={goToNext}
          disabled={index === cards.length}
        >
          <ChevronIcon className="h-8 w-8 select-none text-gray-700" />
        </button>
      </div>

      {/* Bottom Buttons */}
      <div
        className={`flex flex-col items-center justify-center gap-3 ${
          index >= cards.length && "invisible"
        }`}
      >
        {/* Difficulty Buttons */}
        <div className="flex-shrink-0 flex items-center justify-center gap-5 h-16">
          <button
            className="bg-[#EF4444] text-white rounded-2xl px-6 py-3 w-48 text-lg cursor-pointer hover:bg-[#DC2626] transition-colors duration-300"
            onClick={() => handleDifficulty(LearningStatus.NOT_LEARNED)}
          >
            <div className="flex justify-center items-center gap-3">
              <img src="/utility/hardIcon.svg" alt="Hard" className="w-4 h-4" />
              Hard
            </div>
          </button>
          <button
            className="bg-laker-gold text-laker-purple rounded-2xl px-6 py-3 w-48 text-lg cursor-pointer hover:bg-[#E0A322] transition-colors duration-300"
            onClick={() => handleDifficulty(LearningStatus.LEARNING)}
          >
            <div className="flex justify-center items-center gap-3">
              <img
                src="/utility/checkMarkIcon.svg"
                alt="Good"
                className="w-4 h-4"
              />
              Good
            </div>
          </button>
          <button
            className="bg-[#22C55E] text-white rounded-2xl px-6 py-3 w-48 text-lg cursor-pointer hover:bg-[#16A34A] transition-colors duration-300"
            onClick={() => handleDifficulty(LearningStatus.MASTERED)}
          >
            <div className="flex justify-center items-center gap-3">
              <img src="/utility/starIcon.svg" alt="Easy" className="w-4 h-4" />
              Easy
            </div>
          </button>
        </div>
        {/* Back Button */}
        <button
          className="flex justify-center items-center cursor-pointer hover:bg-gray-300 rounded-xl p-1 w-48"
          onClick={() =>
            router.push(`/study/${setId}/${slugify(`${setName}`)}`)
          }
        >
          Back
        </button>
      </div>
    </div>
  );
};
