import type { FlashcardDto } from "@/types/flashcards";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchFlashcardById = async (
  id: number
): Promise<FlashcardDto | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/flashcard/${id}`
    );
    if (!response.ok) throw new Error("Failed to fetch flashcard");
    return (await response.json()) as FlashcardDto;
  } catch (error) {
    console.error("Error fetching flashcard by id:", error);
    return null;
  }
};

export const fetchFlashcardsBySetId = async (
  setId: number
): Promise<FlashcardDto[]> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/flashcard/set/${setId}`
    );
    if (!response.ok) throw new Error("Failed to fetch flashcards for set");
    return (await response.json()) as FlashcardDto[];
  } catch (error) {
    console.error("Error fetching flashcards by set id:", error);
    return [];
  }
};

export const fetchUserCardCount = async (): Promise<number> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/flashcard/user/count`
    );

    if (!response.ok) throw new Error("Failed to fetch card count");

    const result = await response.json();
    return result.count || result;
  } catch (error) {
    console.error("Error fetching card count:", error);
    return 0;
  }
};
