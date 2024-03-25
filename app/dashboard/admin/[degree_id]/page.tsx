import { redirect } from "next/navigation";

export default function Page({ params }:any) {
  redirect(`${params.degree_id}/batchs`);
}
