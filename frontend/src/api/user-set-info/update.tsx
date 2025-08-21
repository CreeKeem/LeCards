import { UserSetInfoDto, UpdateUserSetInfoDto } from "@/types/user-set-info";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateUserSetInfo = async (
  data: Omit<UpdateUserSetInfoDto, "userId">
): Promise<UserSetInfoDto | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-set-info`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to update user set info");

    return await response.json();
  } catch (error) {
    console.error("Error updating user set info:", error);
    return null;
  }
};

export const updateCardsLearned = async (
  setId: number
): Promise<number> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-set-info/set/${setId}/cards-learned`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) throw new Error("Failed to update user set info cards learned");

    return await response.json();
  } catch (error) {
    console.error("Error updating user set info:", error);
    return 0;
  }
};
