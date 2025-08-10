import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteUserSetInfo = async (setId: number): Promise<boolean> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-set-info/set/${setId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) throw new Error("Failed to delete user set info");

    return true;
  } catch (error) {
    console.error("Error deleting user set info:", error);
    return false;
  }
};
