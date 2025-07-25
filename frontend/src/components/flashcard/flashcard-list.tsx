"use client";

import { useEffect, useState } from "react";
import { Filter, Flashcard, FlashcardDto, exampleFlashCards } from ".";

export function FlashcardList() {
  const [cards, setCards] = useState<FlashcardDto[]>([]);
  const [filter, setFilter] = useState({
    notLearned: false,
    learning: false,
    mastered: false,
    favorite: false,
  });
  const [sort, setSort] = useState("");

  useEffect(() => {
    setCards(exampleFlashCards);
  }, []);

  const handleCreate = async () => {};

  // *** TODO ***
  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((card) => card.cardId !== id));
  };

  return (
    <div className="flex flex-col max-w-[1216px] w-full gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-xl">All Flashcards</h1>
        <div className="flex gap-6">
          <Filter filter={filter} setFilter={setFilter}/>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-2 py-1 rounded"
          >
            <option value="">Sort</option>
            <option value="alphabetical">Alphabetical</option>
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
        />
      ))}

      <div className="flex max-w-[1216px] w-full bg-linear-to-r from-laker-purple to-laker-gold h-[120px] shadow-sm rounded-2xl items-center justify-center gap-6 cursor-pointer">
        <h1 className="text-white font-semibold text-2xl">Create New Card</h1>
        <img src="/plusIcon.svg" alt="Plus Icon" />
      </div>
    </div>
  );
}
