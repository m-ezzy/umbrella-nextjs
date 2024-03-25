import { queryDatabase } from "@/lib/database"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: {enrollment_id: string} }) {
  redirect(`/dashboard/student/${params.enrollment_id}/schedule`);

  console.log(params.enrollment_id)
  // if(Number(params.enrollment) satisfies number) {
  
  const data = await queryDatabase(`SELECT * FROM batch_user WHERE enrollment_id=${params.enrollment_id}`)
  console.log(data)

  return (
    <div>
      <h1>Enrollment Index Page</h1>
    </div>
  )
}
