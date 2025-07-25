import { UserSetInfoDto } from "@/types/user-set-info";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchUserSetInfosByUser = async (
  userId: number
): Promise<UserSetInfoDto[] | null> => {
  try {
    const res = await fetch(`${backendUrl}/user-set-info/user/${userId}`);

    if (!res.ok) throw new Error("Failed to fetch user's sets");

    return await res.json();
  } catch (error) {
    console.error("Error fetching user sets:", error);
    return null;
  }
};

export const fetchUserSetInfoById = async (id: number): Promise<UserSetInfoDto | null> => {
  try {
    const res = await fetch(`${backendUrl}/user-set-info/${id}`);

    if (!res.ok) throw new Error("Failed to fetch set");

    return await res.json();
  } catch (error) {
    console.error("Error fetching set:", error);
    return null;
  }
};
