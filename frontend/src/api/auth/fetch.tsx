import { UserInfo } from "@/types/auth";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchUser = async (userId: number): Promise<UserInfo | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/auth/user/${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const fetchCurrentUserProfile = async (): Promise<UserInfo | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/auth/profile`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
