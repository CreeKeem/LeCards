import { UpdateFlashcardDto } from "@/types/flashcards";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateFlashcard = async (data: UpdateFlashcardDto) => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/flashcard`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to update flashcard");

    return await response.json();
  } catch (error) {
    console.error("Error updating flashcard:", error);
    return null;
  }
};
