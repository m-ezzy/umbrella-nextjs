import { redirect } from "next/navigation";

export default function Page({ params: { department_id } }: { params: { department_id: string } }) {
  // redirect(`/dashboard/professor/analysis`);
  redirect(`/dashboard/professor/${department_id}/analysis`);
}
