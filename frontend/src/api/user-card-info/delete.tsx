import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteUserCardInfo = async (cardId: number): Promise<boolean> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-card-info/card/${cardId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) throw new Error("Failed to delete user card info");

    return true;
  } catch (error) {
    console.error("Error deleting user card info:", error);
    return false;
  }
};
