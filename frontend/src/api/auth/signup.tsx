import { UserInfo } from "./user-info";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function signup() {
  if (!backendUrl) {
    console.error("Backend URL Not Found");
    return;
  }

  return;
}
