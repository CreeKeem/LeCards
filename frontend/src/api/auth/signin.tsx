import { SignInDto } from "@/types/auth";
import { TokenService, Tokens } from "@/lib/auth/token-service";
import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const signin = async (data: SignInDto): Promise<boolean> => {
  try {
    const response = await ApiClient.publicFetch(`${backendUrl}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Signin failed");
    }

    const tokens: Tokens = await response.json();
    TokenService.setTokens(tokens, data.rememberMe || false);
    return true;
  } catch (error) {
    console.error("Signin error:", error);
    return false;
  }
};
