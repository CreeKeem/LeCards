import { useEffect, useState } from "react";
import { MatchCard } from "./match-card";
import { fetchFlashcardsBySetId } from "@/api/flashcard";
import { match } from "node:assert";

export interface MatchCardProps {
  content: string;
  selected: boolean;
  flashcardId: number;
}

export function MatchGrid({ setId }: { setId: number }) {
  const [cards, setCards] = useState<MatchCardProps[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCardProps[]>([]);

  useEffect(() => {
    const getCards = async () => {
      let flashcards = await fetchFlashcardsBySetId(setId);
      flashcards.sort(() => Math.random() - 0.5);
      flashcards = flashcards.slice(0, Math.min(flashcards.length, 8));
      let matchCards: MatchCardProps[] = [];
      for (const flashcard of flashcards) {
        const term: MatchCardProps = {
          content: flashcard.term,
          selected: false,
          flashcardId: flashcard.cardId,
        };
        const def: MatchCardProps = {
          content: flashcard.definition,
          selected: false,
          flashcardId: flashcard.cardId,
        };
        matchCards.push(term, def);
      }
      matchCards.sort(() => Math.random() - 0.5);
      setCards(matchCards);
    };
    getCards();
  }, []);

  const handleSelect = (card: MatchCardProps) => {
    setSelectedCards((prev) => {
      const exists = prev.find(
        (x) => x.flashcardId === card.flashcardId && x.content === card.content
      );
      if (exists) {
        return prev.filter(
          (x) =>
            !(x.flashcardId === card.flashcardId && x.content === card.content)
        );
      } else {
        return [...prev, card];
      }
    });

    if (selectedCards.length === 2) {
      const correct = selectedCards[0].flashcardId === selectedCards[1].flashcardId;
      if (correct) {
        setSelectedCards([])
      }
    }
    return false
  };

  return (
    <div className="bg-gray-200 w-full h-[720px] rounded-2xl grid p-2 grid-cols-4 grid-rows-4 gap-3">
      {cards.map((card, i) => (
        <MatchCard key={i} card={card} selectFunction={handleSelect} />
      ))}
    </div>
  );
}
