import { UserCardInfoDto, CreateUserCardInfoDto } from "@/types/user-card-info";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createUserCardInfo = async (
  data: CreateUserCardInfoDto
): Promise<UserCardInfoDto | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-card-info`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to create user card info: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating user card info:", error);
    return null;
  }
};
