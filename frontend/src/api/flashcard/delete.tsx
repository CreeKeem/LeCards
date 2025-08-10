import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteCard = async (cardId: number) => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/flashcard/${cardId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) throw new Error("Failed to delete card");

    return true;
  } catch (error) {
    console.error("Error deleting card:", error);
    return false;
  }
};
