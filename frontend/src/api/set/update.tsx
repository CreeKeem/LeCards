import { UpdateSetDto, SetDto } from "@/types/sets";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateSet = async (data: UpdateSetDto): Promise<SetDto | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(`${backendUrl}/set`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update set");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating set:", error);
    return null;
  }
};
