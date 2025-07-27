import { fetchSetById } from "@/api/set";
import { redirect } from "next/navigation";

export default async function StudyRedirectPage({
  params,
}: {
  params: { setId: string };
}) {
  const set = await fetchSetById(+params.setId);
  if (!set) {
    redirect("/not-found");
  }

  redirect(`/study/${params.setId}/${set.name}`);
}
