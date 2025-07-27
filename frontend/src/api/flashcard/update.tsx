import { UpdateFlashcardDto } from "@/types/flashcards";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateFlashcard = async (data: UpdateFlashcardDto) => {
  try {
    const res = await fetch(`${backendUrl}/flashcard`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update flashcard");

    return await res.json();
  } catch (error) {
    console.error("Error updating flashcard:", error);
    return null;
  }
};
