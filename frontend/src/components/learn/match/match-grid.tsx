import { useEffect, useState } from "react";
import { MatchCard } from "./match-card";
import { fetchFlashcardsBySetId } from "@/api/flashcard";

export interface MatchCardProps {
  content: string;
  selected: boolean;
  flashcardId: number;
  matched: boolean;
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
          matched: false,
        };
        const def: MatchCardProps = {
          content: flashcard.definition,
          selected: false,
          flashcardId: flashcard.cardId,
          matched: false,
        };
        matchCards.push(term, def);
      }
      matchCards.sort(() => Math.random() - 0.5);
      setCards(matchCards);
    };
    getCards();
  }, []);

  useEffect(() => {
    if (!selectedCards) {
        return
    }
    setSelectedCards([])
  }, [selectedCards])

  const handleSelect = (card: MatchCardProps) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.flashcardId === card.flashcardId && c.content === card.content) {
          return { ...c, selected: !c.selected };
        }
        return c;
      })
    );
    
    setSelectedCards((prev) => [...prev, card])
    
    
    return false;
  };

  return (
    <div className="bg-gray-200 w-full h-[720px] rounded-2xl grid p-2 grid-cols-4 grid-rows-4 gap-3">
      {cards.map((card, i) => (
        <MatchCard key={i} card={card} selectFunction={handleSelect} />
      ))}
    </div>
  );
}
