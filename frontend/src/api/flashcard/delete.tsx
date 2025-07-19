const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteCard = async (cardId: number) => {
  try {
    const res = await fetch(`${backendUrl}/flashcard/${cardId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete card");

    return true;
  } catch (error) {
    console.error("Error deleting card:", error);
    return false;
  }
};
