import { SetDto } from "@/types/sets";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchUserSets = async (): Promise<SetDto[] | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/set/user/my-sets`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user's sets");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user sets:", error);
    return null;
  }
};

export const fetchSetById = async (id: number): Promise<SetDto | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/set/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch set");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching set:", error);
    return null;
  }
};

export const fetchUserSetCount = async (): Promise<number> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/set/user/count`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch set count");
    }

    const result = await response.json();
    return result.count || result;
  } catch (error) {
    console.error("Error fetching set count:", error);
    return 0;
  }
};
