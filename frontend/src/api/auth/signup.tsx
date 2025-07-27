import { SignUpDto, UserInfo } from "@/types/auth";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const signup = async (data: SignUpDto): Promise<UserInfo | null> => {
  try {
    const res = await fetch(`${backendUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Signup failed");

    return await res.json();
  } catch (error) {
    console.error("Signup error:", error);
    return null;
  }
};