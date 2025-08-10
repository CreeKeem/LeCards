import { CreateUserSetInfoDto, UserSetInfoDto } from "@/types/user-set-info";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createUserSetInfo = async (
  data: CreateUserSetInfoDto
): Promise<UserSetInfoDto | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-set-info`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to create user set info");

    return await response.json();
  } catch (error) {
    console.error("Error creating user set info:", error);
    return null;
  }
};
