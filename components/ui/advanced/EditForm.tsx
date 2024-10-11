// UpdateForm
'use client'

import { createRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import FormInput from '@/components/ui/form_controls/FormInput'
import FormSelect from '@/components/ui/form_controls/FormSelect'

export type EditFormProps = {
  fields: any[];
  // setEditMode: any;
  serverAction: any;
}
function SubmitButton() {
  const { pending }: any = useFormStatus();

  return (
    <button type="submit" className={`ml-auto ${pending ? "animate-pulse" : ""}`} aria-disabled={pending}>
      <span className="material-symbols-outlined">update</span>
      Update or Submit
    </button>
  );
}
export default function EditForm({ fields, serverAction }: EditFormProps) {
  const [editMode, setEditMode]: any = useState(false);
  let formRef: any = createRef<HTMLFormElement>();
  let [state, dispatch]: any = useFormState(serverAction, null);

  const fieldItems: any = fields.map((field: any) => {
    if(['color', 'date', 'email', 'hidden', 'month', 'number', 'password', 'range', 'search', 'text', 'time', 'url', 'week'].includes(field.type ?? 'text')) {
      return <FormInput key={field.name} { ...field } readOnly={!editMode} /> // value={{ field }}
    } else if(field.type === 'select') {
      return <FormSelect key={field.name} { ...field } />
    }
  });
  return (
    <div>
      <div className="bg-violet-100 text-3xl rounded-t-md p-2">Edit</div>
      <form action={dispatch} ref={formRef} className="bg-gray-200 borde rounded-b-md p-2 space-y-2">
        <div className="grid grid-cols-2 fle flex-wrap gap-2 items-center lg:grid-cols-6">
          {fieldItems}
        </div>
        <div className="flex items-center">
          {/* <button onClick={() => setEditMode((prev: any) => !prev)}>{editMode ? "Cancel" : "Edit"}</button> */}
          <button type="button" onClick={() => setEditMode(false)} className="mr-auto">
            <span className="material-symbols-outlined">edit</span>
            Edit
          </button>
          <button type="button" onClick={() => setEditMode(false)} className="mr-auto">
            <span className="material-symbols-outlined">cancel</span>
            Cancel
          </button>
          {editMode && <SubmitButton />}
        </div>
      </form>
    </div>
  );
}
