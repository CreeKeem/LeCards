import { fetchUser } from "@/api/auth";
import { redirect } from "next/navigation";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

export default async function ProfileRedirectPage({
  params,
}: {
  params: { userId: string };
}) {
  const userInfo = await fetchUser(+params.userId);
  console.log(userInfo)
  if (!userInfo) {
    redirect("/not-found");
  }

  redirect(
    `/profile/${userInfo.userId}/${slugify(
      `${userInfo.fName} ${userInfo.lName}`
    )}`
  );
}
