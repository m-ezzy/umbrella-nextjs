import { auth } from "@/lib/auth"
import AssignmentForm from "@/components/forms/AssignmentForm"
import AssignmentList from "@/components/lists/AssignmentList"

export default function Page() {
  return (
    <>
      <AssignmentForm />
      <AssignmentList />
    </>
  )
}
