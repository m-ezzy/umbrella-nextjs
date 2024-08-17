// "use client"
import { useFormState, useFormStatus } from "react-dom"
import { updateAttendanceStatus } from "@/actions/attendance"

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      <span className="material-symbols-outlined">check</span>
      Verify Attendance
    </button>
  )
}

export default function AttendanceVerifyButton({ session_id }: any) {
  const [state, formAction] = useFormState(updateAttendanceStatus, null);

  return (
    <div>
      <form action={formAction}>
        <input type="hidden" name="session_id" value={session_id} hidden />
        <SubmitButton />
      </form>

      {state?.error && <div>{state.error}</div>}
    </div>
  )
}
