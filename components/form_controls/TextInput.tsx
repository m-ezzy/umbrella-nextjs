// "use client"
export default function({ label, name, hidden, defaultValue, required, extra_classes }: any) {
  return (
    // <div className={`space-x-1 form-outline border flex justify-between items-center ${extra_classes}`}>
    <>
      { !hidden && <label className="">{label}</label> }
      <input type="text" name={name} className="form-control border-violet-400 rounded-md focus:ring-violet-500 focus:border-violet-500" required={required} hidden={hidden} defaultValue={defaultValue} />
    </>
    // </div>
  )
}
