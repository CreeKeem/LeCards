import { CreateFlashcardDto } from "@/types/flashcards";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createCard = async (cardData: CreateFlashcardDto) => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/flashcard`,
      {
        method: "POST",
        body: JSON.stringify(cardData),
      }
    );

    if (!response.ok) throw new Error("Failed to create card");

    return await response.json();
  } catch (error) {
    console.error("Error creating card:", error);
    return null;
  }
};
