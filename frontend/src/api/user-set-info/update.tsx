import { UserSetInfoDto, UpdateUserSetInfoDto } from "@/types/user-set-info";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateSet = async (
  data: UpdateUserSetInfoDto
): Promise<UserSetInfoDto | null> => {
  try {
    const res = await fetch(`${backendUrl}/user-set-info`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update set");

    return await res.json();
  } catch (error) {
    console.error("Error updating set:", error);
    return null;
  }
};
