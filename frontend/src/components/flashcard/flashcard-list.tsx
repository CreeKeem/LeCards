"use client";

import { useEffect, useState } from "react";
import {
  ExampleUserCardInfos,
  Filter,
  Flashcard,
  FlashcardDto,
  UserCardInfoDto,
  exampleFlashCards,
} from ".";
import { fetchFlashcardsBySetId } from "@/api/flashcard";
import { fetchSetUserCardInfo } from "@/api/user-card-info";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export function FlashcardList({
  edit,
  setId,
}: {
  edit: boolean;
  setId: number;
}) {
  const [cards, setCards] = useState<FlashcardDto[]>([]);
  const [filter, setFilter] = useState({
    notLearned: false,
    learning: false,
    mastered: false,
    favorite: false,
  });
  const [sort, setSort] = useState("");
  const [userCardInfo, setUserCardInfo] = useState<UserCardInfoDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthGuard();

  useEffect(() => {
    if (!isAuthenticated) return;

    const getSetCards = async () => {
      try {
        const [flashcards, cardInfo] = await Promise.all([
          fetchFlashcardsBySetId(setId),
          fetchSetUserCardInfo(setId),
        ]);
        setCards(flashcards);
        setUserCardInfo(cardInfo);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    getSetCards();
  }, [isAuthenticated, setId]);

  const handleCreate = async () => {
    // TODO: Implement create functionality
  };

  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((card) => card.cardId !== id));
    setUserCardInfo((prev) => prev.filter((info) => info.cardId !== id));
  };

  if (loading) {
    return (
      <div className="flex flex-col max-w-[1216px] w-full gap-4">
        <div className="flex justify-between items-center mb-3">
          <h1 className="font-bold text-xl">All Flashcards</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-laker-purple"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-[1216px] w-full gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-xl">All Flashcards</h1>
        <div className="flex gap-6">
          <Filter filter={filter} setFilter={setFilter} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-2 py-1 rounded"
          >
            <option value="">Sort</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="favorites">Favorites</option>
            <option value="not-learned">Not Learned</option>
            <option value="learning">Learning</option>
            <option value="mastered">Mastered</option>
          </select>
        </div>
      </div>

      {cards.map((flashcard) => (
        <Flashcard
          key={flashcard.cardId}
          flashcard={flashcard}
          handleDelete={() => handleDelete(flashcard.cardId)}
          userCardDto={userCardInfo.find((e) => e.cardId == flashcard.cardId)!}
          isEdit={edit}
        />
      ))}

      <div
        className="flex max-w-[1216px] w-full bg-gradient-to-r from-laker-purple to-laker-gold h-[120px] shadow-sm rounded-2xl items-center justify-center gap-6 cursor-pointer hover:from-[#7831B7] hover:to-[#E0A322] duration-300"
        onClick={handleCreate}
      >
        <h1 className="text-white font-semibold text-2xl">Create New Card</h1>
        <img src="/utility/plusIcon.svg" alt="Plus Icon" />
      </div>
    </div>
  );
}
