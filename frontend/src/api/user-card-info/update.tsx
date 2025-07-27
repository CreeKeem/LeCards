import { UpdateUserCardInfoDto, UserCardInfoDto } from "@/types/user-card-info";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateUserCardInfo = async ({
  userId,
  cardId,
  favorite,
  learningStatus,
  lastReviewed
}: UpdateUserCardInfoDto): Promise<UserCardInfoDto | null> => {
  try {
    const body: any = {
      userId,
      cardId,
      favorite,
      learningStatus,
    };

    if (lastReviewed) {
      body.lastReviewed = lastReviewed.toISOString();
    }

    const res = await fetch(
      `${backendUrl}/user-card-info`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) throw new Error("Failed to update user card info");

    return await res.json();
  } catch (error) {
    console.error("Error updating user card info:", error);
    return null;
  }
};
