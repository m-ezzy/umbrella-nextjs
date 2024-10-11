"use client"

export type SelectFormField = {
  label?: string;
  name: string;
  options?: any[];
  value?: any;
  defaultValue?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}
export default function({
  label, name, options=[], value, defaultValue, disabled=false, required=true
} : SelectFormField) {
  return (
    <>
      <label>{label} {required && <span>*</span>}</label>
      <select
        name={name}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        className="form-control"
      >
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </select>
    </>
  )
}
