import { queryDatabase } from "@/lib/database"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: {enrollment: string} }) {
  redirect(`/student/${params.enrollment}/schedule`);

  console.log(params.enrollment)
  // if(Number(params.enrollment) satisfies number) {
  
  const data = await queryDatabase(`SELECT * FROM batch_user WHERE enrollment_id=${params.enrollment}`)
  console.log(data)

  return (
    <div>
      <h1>Enrollment Index Page</h1>
    </div>
  )
}
