"use client"
// "use server"
// import { useActionState } from "react";

import { createRef } from "react"
import { useFormStatus, useFormState } from "react-dom"
// import TextInput from "@/components/form_controls/TextInput"
import FormInput, { InputFormField } from "@/components/ui/form_controls/FormInput"

type ActionFormProps = {
  type: string;
  fields: InputFormField[];
  serverAction: any;
  button?: any;
  label: string; //ObjectName
}

const buttonIcons: any = {
  "Create": "add",
  // "Edit": "edit",
  "Update": "update",
  "Delete": "delete",
};
const buttonText: any = {
  "Create": "Add", // Create New
  // "Edit": "Edit",
  "Update": "Update",
  "Delete": "Delete",
};

// Action Create Update Modal
export default function ActionForm({ type, fields, serverAction, button, label }: ActionFormProps) {
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
    // if(field.type === 'text') {
    //   value={{ field }}
    //   return <TextInput key={field.name} label={field.label} name={field.name} hidden={field.hidden} required={field.required ? true : false} defaultValue={field.defaultValue} />
    // } else 
    if(['text', 'number', 'email', 'password', 'date', 'time'].includes(field.type)) {
      return <FormInput key={field.name} type={field.type} label={field.label} name={field.name} hidden={field.hidden} required={field.required ? true : false} defaultValue={field.defaultValue} />
    }
  });
  return (
    <>
      <form action={formAction} ref={formRef} className="bg-gray-200 borde rounded p-2 space-y-2">
        <div className="grid grid-cols-2 fle flex-wrap gap-2 items-center lg:grid-cols-6">
          {fieldItems}
        </div>
        <div className="mt-2 flex items-center">
          { state?.success && <div className="text-green-500 font-bold">{state.success}</div> }
          { state?.error && <div className="text-red-500 font-bold">{state.error}</div> }
          <button type="submit" className="ml-auto">
            {/* <span className="material-symbols-outlined">{button.icon}</span> */}
            <span className="material-symbols-outlined">{buttonIcons[type]}</span>
            {/* {button.label} */}
            {/* {buttonText[type]} */}
            {type} {label}
          </button>
        </div>
      </form>
      {/*
      {
        state?.status === 'success' && <div className="text-green-400">{state.message}</div>
      }
      {
        state?.status === 'error' && <div className="text-red-400">{state.message}</div>
      }
      */}
    </>
  );
}
