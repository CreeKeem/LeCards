import { SetDto } from ".";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchSetsByUser = async (
  userId: number
): Promise<SetDto[] | null> => {
  try {
    const res = await fetch(`${backendUrl}/set/user/${userId}`);

    if (!res.ok) throw new Error("Failed to fetch user's sets");

    return await res.json();
  } catch (error) {
    console.error("Error fetching user sets:", error);
    return null;
  }
};

export const fetchSetById = async (id: number): Promise<SetDto | null> => {
  try {
    const res = await fetch(`${backendUrl}/set/${id}`);

    if (!res.ok) throw new Error("Failed to fetch set");

    return await res.json();
  } catch (error) {
    console.error("Error fetching set:", error);
    return null;
  }
};

export const fetchUserSetCount = async (id: number): Promise<number> => {
  try {
    const res = await fetch(`${backendUrl}/set/user/${id}/count`);

    if (!res.ok) throw new Error("Failed to fetch set");

    return await res.json();
  } catch (error) {
    console.error("Error fetching set:", error);
    return 0;
  }
};

