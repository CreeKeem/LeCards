import { UpdateUserCardInfoDto, UserCardInfoDto } from "@/types/user-card-info";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateUserCardInfo = async ({
  cardId,
  favorite,
  learningStatus,
  lastReviewed,
}: Omit<UpdateUserCardInfoDto, "userId">): Promise<UserCardInfoDto | null> => {
  try {
    const body: any = {
      cardId,
      favorite,
      learningStatus,
    };

    if (lastReviewed) {
      body.lastReviewed = lastReviewed.toISOString();
    }

    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-card-info`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) throw new Error("Failed to update user card info");

    return await response.json();
  } catch (error) {
    console.error("Error updating user card info:", error);
    return null;
  }
};
