import { CreateSetDto, SetDto } from "@/types/sets";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createSet = async (data: CreateSetDto): Promise<SetDto | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(`${backendUrl}/set`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create set");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating set:", error);
    return null;
  }
};
