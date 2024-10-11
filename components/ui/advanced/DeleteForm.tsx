'use client'

import { useFormState, useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className="ml-auto hover:bg-red-500" disabled={pending}>
      <span className="material-symbols-outlined">delete</span>
      Delete
    </button>
  )
}
export default function DeleteForm({ objectName, id, serverAction }: any) {
  /* {..., object: { id: number, something_else_to uniquly_identify: string } } */
  /* {..., field: { } } */
  let [state, dispatch]: any = useFormState(serverAction, { data: null, error: null })

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" value={id} required readOnly />
      { state?.error && <div className="text-red-500 font-bold">{state.error}</div> }
      <SubmitButton />
    </form>
  )
}
