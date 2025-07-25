import { CreateFlashcardDto } from "@/types/flashcards";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createCard = async (cardData: CreateFlashcardDto) => {
  try {
    const res = await fetch(`${backendUrl}/flashcard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });

    if (!res.ok) throw new Error("Failed to create card");

    return await res.json();
  } catch (error) {
    console.error("Error creating card:", error);
    return null;
  }
};
