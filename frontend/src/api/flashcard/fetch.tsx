import type { FlashcardInfo } from "@/types/flashcards";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchFlashcardById = async (id: number): Promise<FlashcardInfo | null> => {
  try {
    const res = await fetch(`${backendUrl}/flashcard/${id}`);
    if (!res.ok) throw new Error("Failed to fetch flashcard");
    return (await res.json()) as FlashcardInfo;
  } catch (error) {
    console.error("Error fetching flashcard by id:", error);
    return null;
  }
};

export const fetchFlashcardsBySetId = async (setId: number): Promise<FlashcardInfo[]> => {
  try {
    const res = await fetch(`${backendUrl}/flashcard/set/${setId}`);
    if (!res.ok) throw new Error("Failed to fetch flashcards for set");
    return (await res.json()) as FlashcardInfo[];
  } catch (error) {
    console.error("Error fetching flashcards by set id:", error);
    return [];
  }
};
