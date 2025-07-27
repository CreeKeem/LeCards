import { SignInDto, UserInfo } from "@/types/auth";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const signin = async (data: SignInDto): Promise<UserInfo | null> => {
  try {
    const res = await fetch(`${backendUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Signin failed");

    return await res.json();
  } catch (error) {
    console.error("Signin error:", error);
    return null;
  }
};
