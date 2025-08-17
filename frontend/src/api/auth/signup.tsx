import { SignUpDto } from "@/types/auth";
import { TokenService, Tokens } from "@/lib/auth/token-service";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const signup = async (data: SignUpDto): Promise<boolean> => {
  try {
    const response = await ApiClient.publicFetch(`${backendUrl}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const tokens: Tokens = await response.json();
    TokenService.setTokens(tokens, data.rememberMe || false);
    return true;
  } catch (error) {
    console.error("Signup error:", error);
    return false;
  }
};
