import Link from "next/link";
import DivisionList from "@/components/division/DivisionList";
import { updateBatch, deleteBatch } from "@/actions/batch";

export default async function BatchList({ degree_id, syllabus, batchs }: { degree_id: number, syllabus: any, batchs: any }) {
  const batchItems = batchs.map((item: any) => (
    <li key={item.batch_id} className="bg-neutral-300 min-w-60 min-h-60 border rounded-md p-2 space-y-4">
      <div className="flex justify-end gap-1">
        <form action={updateBatch}>
          <input type="hidden" name="batch_id" value={item.batch_id} hidden />
          <button type="submit">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </form>
        <form action={deleteBatch}>
          <input type="hidden" name="batch_id" value={item.batch_id} hidden />
          <button type="submit">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </form>
      </div>
      <Link href={`/dashboard/admin/${0}/batch/${item.batch_id}/`} className="grid justify-center">
        <p>Start Year: {item.year_started}</p>
        <p>End Year: {item.year_ended ? item.year_ended : "----"}</p>
        <p>Syllabus: Effective from {item.syllabus.year_effective}</p>
        <p>Enrolled: {item._count.enrollments}</p>
      </Link>
      <DivisionList batch_id={item.batch_id} divisions={item.divisions} />
    </li>
  ));
  return (
    <ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
      {batchItems}
    </ul>
  );
}
