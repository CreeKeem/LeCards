import { fetchSetById } from "@/api/set";
import { redirect } from "next/navigation";

const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

export default async function EditRedirectPage({
  params,
}: {
  params: { setId: string };
}) {
  const set = await fetchSetById(+params.setId);
  if (!set) {
    redirect("/not-found");
  }

  redirect(`/set/edit/${params.setId}/${slugify(set.name)}`);
}
