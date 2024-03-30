import Link from "next/link";
import { updateDivision, deleteDivision } from "@/actions/division";

export default async function DivisionList({ batch_id, divisions }: any) {

  const divisionItems = divisions.map((division: any) => 
    <li key={divisions.division_id} className="bg-gray-300 w-36 h-36 border rounded-md">
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
      <div className="flex justify-center">Students: {division._count.enrollment}</div>
    </li>
  );
  return <ul className="flex flex-wrap gap-2 justify-center">{divisionItems}</ul>
}
