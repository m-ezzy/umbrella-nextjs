import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { enrollment_id: string } }) {
  redirect(`/dashboard/student/${params.enrollment_id}/analysis`);
}
