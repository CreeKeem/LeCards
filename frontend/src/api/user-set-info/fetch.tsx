import { UserSetInfoDto } from "@/types/user-set-info";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchUserSetInfos = async (): Promise<UserSetInfoDto[] | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-set-info`
    );

    if (!response.ok) throw new Error("Failed to fetch user set infos");

    return await response.json();
  } catch (error) {
    console.error("Error fetching user set infos:", error);
    return null;
  }
};

export const fetchUserSetInfo = async (
  setId: number
): Promise<UserSetInfoDto | null> => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/user-set-info/set/${setId}`
    );

    if (!response.ok) throw new Error("Failed to fetch user set info");

    return await response.json();
  } catch (error) {
    console.error("Error fetching user set info:", error);
    return null;
  }
};
