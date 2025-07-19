const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteUserCardInfo = async (userId: number, cardId: number) => {
  try {
    const res = await fetch(
      `${backendUrl}/user-card-info/user/${userId}/card/${cardId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) throw new Error("Failed to delete user card info");

    return await res.json();
  } catch (error) {
    console.error("Error deleting user card info:", error);
    return null;
  }
};
