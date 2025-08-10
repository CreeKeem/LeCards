import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteSet = async (id: number): Promise<boolean> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/set/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete set");
    }

    return true;
  } catch (error) {
    console.error("Error deleting set:", error);
    return false;
  }
};
