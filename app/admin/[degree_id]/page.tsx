import { redirect } from "next/navigation";

export default function Page({ params }:any) {
  redirect(`/admin/${params.degree_id}/teaching`);
}
