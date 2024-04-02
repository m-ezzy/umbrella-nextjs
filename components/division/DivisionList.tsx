import Link from "next/link";
import { division } from "@prisma/client";
import { updateDivision, deleteDivision } from "@/actions/division";

export default async function DivisionList({ batch_id, divisions }: { batch_id: number, divisions: division[] }) {

  const divisionItems = divisions.map((division: division) => 
    <li key={division.division_id} className="bg-neutral-400 w-36 h-36 border rounded-md">
      <div className="p-1 flex justify-end gap-1">
        <form action={updateDivision}>
          <input type="hidden" name="division_id" value={division.division_id} hidden />
          <button type="submit" className="w-8 h-8">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </form>
        <form action={deleteDivision}>
          <input type="hidden" name="division_id" value={division.division_id} hidden />
          <button type="submit" className="w-8 h-8">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </form>
      </div>
      <Link href={`/dashboard/admin/${0}/batch/${division.batch_id}/division/${division.division_id}/`} className="min-w-20 min-h-20 flex justify-center items-center">
        <p>{division.division_name}</p>
      </Link>
      <div className="flex justify-center">Students: {division._count.enrollments}</div>
    </li>
  );
  return <ul className="flex flex-wrap gap-2 justify-center">{divisionItems}</ul>
}
