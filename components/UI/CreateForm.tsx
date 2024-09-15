"use client";
import { createRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import FormInput, { InputFormField } from "@/components/form_controls/FormInput";

type CreateFormProps = {
  fields: InputFormField[];
  serverAction: any;
  objectName: string;
  disabled?: boolean;
}
function SubmitButton({ objectName, disabled }: { objectName: string, disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="ml-auto" disabled={disabled || pending}>
      <span className="material-symbols-outlined">add</span>
      Create {objectName} {/* New Add */}
    </button>
  );
}
export default function CreateForm({ fields, serverAction, objectName, disabled=false }: CreateFormProps) {
  let formRef: any = createRef<HTMLFormElement>();
  let [state, formAction]: any = useFormState(serverAction, null);

  // if(state?.success) {
  //   fields = fields.map((field: any) => {
  //     field.defaultValue = '';
  //     return field;
  //   });
  // }
  if(state?.success) {
    formRef.current?.reset();
  }
  const fieldItems = fields.map((field: any) => {
    if(['text', 'number', 'email', 'password', 'date', 'time'].includes(field.type)) {
      return <FormInput key={field.name} { ...field } />
      // value={{ field }}
    }
  });
  return (
    <form action={formAction} ref={formRef} className="bg-gray-200 borde rounded p-2 space-y-2">
      <div className="grid grid-cols-2 fle flex-wrap gap-2 items-center lg:grid-cols-6">
        {fieldItems}
      </div>
      <div className="mt-2 flex items-center">
        {/* <FormActionOutput state={state} objectName={objectName} /> */}

        {/* { state?.success && <div className="text-green-500 font-bold">{objectName} created successfully</div> } */}
        { state?.success && <div className="text-green-500 font-bold">{state.success}</div> }
        { state?.error && <div className="text-red-500 font-bold">{state.error}</div> }

        <SubmitButton objectName={objectName} disabled={disabled} />
      </div>
    </form>
  );
}
