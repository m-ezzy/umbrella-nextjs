// "use server";
"use client";

export type InputFormField = { //InputField //FormField //FormInput //TextInput //TextField
  type: string;
  label?: string;
  name: string;
  hidden?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  value?: any;
  defaultValue?: string;
}
export default function({ type="text", label, name, hidden=false, disabled=false, required=true, value, defaultValue, extra_classes }: any) {
  // console.log('FormInput', { type, label, name, hidden, disabled, required, value, defaultValue });

  return (
    // <div className={`space-x-1 form-outline border flex justify-between items-center ${extra_classes}`}>
    <>
      { !hidden && <label className="">{label}</label> }
      <input 
        type={type} 
        name={name} 
        hidden={hidden} 
        disabled={disabled} 
        // readOnly={readOnly} 
        required={required} 
        // value={value} 
        defaultValue={defaultValue} 
        className="form-control border-violet-400 rounded-md focus:ring-violet-500 focus:border-violet-500" 
      />
    </>
    // </div>
  )
}
