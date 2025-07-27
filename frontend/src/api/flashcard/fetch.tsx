import type { FlashcardDto } from "@/types/flashcards";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchFlashcardById = async (id: number): Promise<FlashcardDto | null> => {
  try {
    const res = await fetch(`${backendUrl}/flashcard/${id}`);
    if (!res.ok) throw new Error("Failed to fetch flashcard");
    return (await res.json()) as FlashcardDto;
  } catch (error) {
    console.error("Error fetching flashcard by id:", error);
    return null;
  }
};

export const fetchFlashcardsBySetId = async (setId: number): Promise<FlashcardDto[]> => {
  try {
    const res = await fetch(`${backendUrl}/flashcard/set/${setId}`);
    if (!res.ok) throw new Error("Failed to fetch flashcards for set");
    return (await res.json()) as FlashcardDto[];
  } catch (error) {
    console.error("Error fetching flashcards by set id:", error);
    return [];
  }
};

export const fetchUserCardCount = async (id: number): Promise<number> => {
  try {
    const res = await fetch(`${backendUrl}/flashcard/user/${id}/count`);

    if (!res.ok) throw new Error("Failed to fetch set");

    return await res.json();
  } catch (error) {
    console.error("Error fetching set:", error);
    return 0;
  }
};
