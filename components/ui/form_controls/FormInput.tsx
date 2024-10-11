"use client";

import { useState } from "react";

export type InputFormField = { //InputField //FormFieldInput //FormInput //TextInput //TextField
  type?: string;
  label?: string;
  name: string;
  value?: any;
  defaultValue?: string;
  // hidden?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  // min?: number;
  // max?: number;
  // extra_classes?: string;
}
export default function({ type="text", label, name, value, defaultValue, disabled=false, readOnly=false, required=true }: InputFormField) {
  // const [valueState, setValueState] = useState(value);

  let attributes: any = {}
  if(value) attributes["value"] = value;
  if(defaultValue) attributes["defaultValue"] = defaultValue;

  return (
    // <div className={`space-x-1 form-outline border flex justify-between items-center ${extra_classes}`}>
    <>
      { (type !== "hidden") && <label>{label} {required && <span>*</span>}</label> }
      <input
        type={type}
        name={name}
        // value={value}
        // defaultValue={defaultValue}
        {...attributes}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className="form-control"
      />
    </>
    // </div>
  )
}
