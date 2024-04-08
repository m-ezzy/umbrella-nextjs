"use client"
import { useFormState, useFormStatus } from "react-dom"
import { updateSession } from "@/actions/session"

function SubmitButton({ open_for_attendance }: any) {
  const { pending, data, method, action } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      <span className="material-symbols-outlined">{open_for_attendance ? "lock" : "play_arrow"}</span> {/* door_open */}
      {open_for_attendance ? "Close Attendance" : "Open Attendance"}
    </button>
  )
}

export default function SessionUpdateButton({ session_id, open_for_attendance }: any) {
  const [formState, dispatch] = useFormState(updateSession, null)

  return (
    <div>
      <form action={dispatch}>
        <input type="hidden" name="session_id" value={session_id} hidden />
        <input type="hidden" name="open_for_attendance" value={!open_for_attendance} hidden />
        
        <SubmitButton open_for_attendance={open_for_attendance} />
      </form>
    </div>
  )
}
