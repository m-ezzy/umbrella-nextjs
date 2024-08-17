// "use client"
export default function({ label, field_name, extra_classes }: any) {
  return (
    <div className={`form-outline ${extra_classes}`}>
      <label className="">{label}</label>
      <input type="text" name={field_name} className="form-control w-full border-violet-400 rounded-md focus:ring-violet-600 focus:border-violet-600" />
    </div>
  )
}
