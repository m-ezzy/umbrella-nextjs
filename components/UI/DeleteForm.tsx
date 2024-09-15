"use client";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="bg-red-200 ml-auto" disabled={pending}>
      <span className="material-symbols-outlined">delete</span>
      Delete
    </button>
  );
}
export default function DeleteForm({ id, serverAction, objectName }: any) {
  let [state, dispatch]: any = useFormState(serverAction, null);
  return (
    <form action={dispatch}>
      <input type="number" name="id" value={id} required hidden readOnly />
      { state?.error && <div className="text-red-500 font-bold">{state.error}</div> }
      <SubmitButton />
    </form>
  );
}
