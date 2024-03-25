import { redirect } from "next/navigation";

export default function Page() {
  redirect('/dashboard/professor/courses');
  return (
    <div>
    </div>
  );
}
