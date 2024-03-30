import Link from "next/link";
import { updateSyllabus, deleteSyllabus } from "@/actions/syllabus";
import { prisma } from "@/lib/db";

export default async function SyllabusList({ degree_id, syllabus }: { degree_id: number, syllabus: any }) {
  // const syllabus = await prisma.syllabus.findMany({
  //   select: {
  //     syllabus_id: true,
  //     year_effective: true,
  //   },
  //   where: {
  //     degree_id: degree_id,
  //   },
  // });

  const items = syllabus.map((item: any) => (
    <li key={item.syllabus_id} className="border-b p-2 grid grid-cols-7">
      <div>{item.year_effective}</div>
      <div>
        <form action={updateSyllabus}>
          <input type="hidden" name="syllabus_id" value={item.syllabus_id} hidden />
          <button type="submit">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </form>
      </div>
      <div>
        <form action={deleteSyllabus}>
          <input type="hidden" name="syllabus_id" value={item.syllabus_id} hidden />
          <button type="submit">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </form>
      </div>
    </li>
  ));
  return (
    <div className="mt-4 overflow-auto relative">
      <div className="bg-gray-200 rounded p-2 grid grid-cols-7 sticky top-0">
        <div>Year</div>
        <div>Edit</div>
        <div>Delete</div>
      </div>
      <ul className="flex-col gap-2">
        {items}
      </ul>
    </div>
  )
}
