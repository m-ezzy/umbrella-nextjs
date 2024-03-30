import { createDivision } from "@/actions/division";

export default function DivisionCreate({ batchs }: any) {
  const batchItems = batchs.map(({ batch_id, year_started }: any) => {
    return <option key={batch_id} value={batch_id}>{year_started}</option>
  });
  return (
    <form action={createDivision} className="form border rounded-md p-2 grid grid-cols-2 gap-2 items-center lg:grid-cols-10">
      <label htmlFor="batch_id">Batch</label>
      <select name="batch_id" required>{batchItems}</select>
      <label htmlFor="current_semester">Division Name</label>
      <input type="text" name="division_name" placeholder="Division Name" required />

      <button type="submit" className="col-span-2">
        <span className="material-symbols-outlined">add</span>
        New Division
      </button>
    </form>
  );
}
