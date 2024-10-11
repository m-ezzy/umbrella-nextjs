'use client'

import { createRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import FormInput, { InputFormField } from '@/components/ui/form_controls/FormInput'
import FormSelect from '@/components/ui/form_controls/FormSelect'

export type CreateFormProps = {
  objectName: string
  fields: any[]
  serverAction: any
  buttonDisabled?: boolean
  setSuccess?: any
  mutate?: any
}
function SubmitButton({ objectName, disabled, mutate }: { objectName: string, disabled: boolean, mutate: any }) {
  const { pending }: any = useFormStatus() //in React 19 it returns additional properties: action, data, method

  const handleClick = (e: any) => {
    // mutate()
  }

  return (
    <button type="submit" className={`ml-auto ${pending ? "animate-pulse" : ""}`} aria-disabled={disabled || pending} onClick={handleClick}>
      <span className="material-symbols-outlined">add</span>
      Create {objectName} {/* New Add */}
    </button>
  )
}
export default function CreateForm({ objectName, fields, serverAction, buttonDisabled=false, setSuccess, mutate }: CreateFormProps) {
  // make this controlled component
  let [fieldsValue, setFieldsValue] = useState(fields)

  let formRef: any = createRef<HTMLFormElement>()
  let [state, formAction]: any = useFormState(serverAction, null)

  // if(state?.success) {
  //   fields = fields.map((field: any) => {
  //     field.defaultValue = '';
  //     return field;
  //   });
  // }
  if(state?.success) {
    formRef.current?.reset();
    if(setSuccess) {
      setSuccess((prev: any) => true);
    }
  }
  const fieldItems: any = fields.map((field: InputFormField) => {
    if(['color', 'date', 'email', 'hidden', 'month', 'number', 'password', 'range', 'search', 'text', 'time', 'url', 'week'].includes(field.type ?? 'text')) {
      return <FormInput key={field.name} { ...field } /> // value={{ field }}
    } else if(field.type === 'select') {
      return <FormSelect key={field.name} { ...field } />
    }
  });
  return (
    <div>
    {/* <details open> */}
      {/* <summary> */}
        {/* {objectName} */}
        {/* <button>Bulk Create/Insert from CSV / pdf file</button> */}
      {/* </summary> */}
      {/* <div className="bg-violet-100 text-3xl rounded-t-md p-2">Create</div> */}
      <form action={formAction} ref={formRef} className="bg-gray-200 borde rounded-md p-2 space-y-2">
        <div className="grid grid-cols-2 fle flex-wrap gap-2 items-center lg:grid-cols-6">
          {fieldItems}
        </div>
        <div className="flex items-center">
          {/* <FormActionOutput state={state} objectName={objectName} /> */}
          {/* { state?.success && <div className="text-green-500 font-bold">{objectName} created successfully</div> } */}
          { state?.success && <div className="text-green-500 font-bold">{state.success}</div> }
          { state?.error && <div className="text-red-500 font-bold">{state.error}</div> }

          <SubmitButton objectName={objectName} disabled={buttonDisabled} mutate={mutate} />
        </div>
      </form>
    {/* </details> */}
    </div>
  )
}
