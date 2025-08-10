import { TokenService } from "@/lib/auth/token-service";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const logout = async (): Promise<void> => {
  try {
    await ApiClient.authenticatedFetch(`${backendUrl}/auth/logout`, {
      method: "POST",
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    TokenService.clearTokens();
    window.location.href = '/';
  }
};