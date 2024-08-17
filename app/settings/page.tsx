import { redirect } from "next/navigation";

export default async function Page(props: any) {
  redirect("/settings/account")
}
