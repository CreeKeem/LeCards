import { CreateUserSetInfoDto, UserSetInfoDto } from "@/types/user-set-info";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createSet = async (
  data: CreateUserSetInfoDto
): Promise<UserSetInfoDto | null> => {
  try {
    const res = await fetch(`${backendUrl}/user-set-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create set");

    return await res.json();
  } catch (error) {
    console.error("Error creating set:", error);
    return null;
  }
};
