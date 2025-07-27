import { UserInfo } from ".";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchUser = async (
  userId: number
): Promise<UserInfo | null> => {
  try {
    const res = await fetch(`${backendUrl}/auth/user/${userId}`);

    if (!res.ok) throw new Error("Failed to fetch user's sets");

    return await res.json();
  } catch (error) {
    console.error("Error fetching user sets:", error);
    return null;
  }
};