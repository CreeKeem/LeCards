import { UserCardInfo, CreateUserCardInfoDto } from "@/types/user-card-info";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createUserCardInfo = async (
  data: CreateUserCardInfoDto
): Promise<UserCardInfo | null> => {
  try {
    const response = await fetch(`${backendUrl}/user-card-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
