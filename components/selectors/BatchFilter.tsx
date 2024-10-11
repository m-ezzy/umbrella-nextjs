"use client"

export default function SelectBatch({ batchs, selected, setSelected }: any) {
  const handleChange = (e: any) => setSelected((prev: any) => e.target.value)

  let items: any[] = batchs.map((item: any) => {
    return <option key={item.batch_id} value={item.batch_id}>{item.year_started}</option>
  })
  
  return (
    <div className="border rounded-md p-2">
      <label htmlFor="batch_id">Batch</label>
      <select name="batch_id" value={selected} onChange={handleChange}>
        <option value=""></option>
        {items}
      </select>
    </div>
  )
}
