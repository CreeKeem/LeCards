import { UserCardInfoDto } from "@/types/user-card-info";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchUserCardInfo = async (
  cardId: number
): Promise<UserCardInfoDto | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-card-info/card/${cardId}`
    );
    if (!response.ok) throw new Error("Failed to fetch user card info");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user card info:", error);
    return null;
  }
};

export const fetchSetUserCardInfo = async (
  setId: number
): Promise<UserCardInfoDto[]> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-card-info/set/${setId}`
    );
    if (!response.ok) throw new Error("Failed to fetch set user card info");
    return await response.json();
  } catch (error) {
    console.error("Error fetching set user card info:", error);
    return [];
  }
};

export const fetchUserMasteredCardCount = async (): Promise<number> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-card-info/mastered/count`
    );
    if (!response.ok) throw new Error("Failed to fetch mastered card count");
    const result = await response.json();
    return result.count || result;
  } catch (error) {
    console.error("Error fetching mastered card count:", error);
    return 0;
  }
};

export const fetchLearningStatusCounts = async () => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-card-info/learning-status/counts`
    );
    if (!response.ok) throw new Error("Failed to fetch learning status counts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching learning status counts:", error);
    return { notLearned: 0, learning: 0, mastered: 0, total: 0 };
  }
};

export const fetchUserFavoriteCards = async () => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-card-info/favorites`
    );
    if (!response.ok) throw new Error("Failed to fetch favorite cards");
    return await response.json();
  } catch (error) {
    console.error("Error fetching favorite cards:", error);
    return [];
  }
};
