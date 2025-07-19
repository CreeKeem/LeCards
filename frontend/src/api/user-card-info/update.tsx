import { UserCardInfo } from "@/types/user-card-info";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateUserCardInfo = async ({
  userId,
  cardId,
  favorite,
  learningStatus,
}: UserCardInfo) => {
  try {
    const res = await fetch(
      `${backendUrl}/user-card-info/user/${userId}/card/${cardId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite, learningStatus }),
      }
    );

    if (!res.ok) throw new Error("Failed to update user card info");

    return await res.json();
  } catch (error) {
    console.error("Error updating user card info:", error);
    return null;
  }
};
