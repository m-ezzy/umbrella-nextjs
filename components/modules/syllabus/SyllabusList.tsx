"use server"
import Link from "next/link"
import { updateSyllabus, deleteSyllabus } from "@/actions/syllabus"
import { prisma } from "@/lib/db"
import ListTable from "@/components/ui/ListTable";

export default async function SyllabusList({ degree_ids }: { degree_ids: number[] }) {
  const syllabuses = await prisma.syllabus.findMany({
    where: {
      degree_id: {
        in: degree_ids,
      },
    },
  });
  const items = syllabuses.map((item: any) => (
    <li key={item.id} className="border-b p-1 grid grid-cols-6 items-center">
      <div>{item.year_effective}</div>
      <div>{item.code}</div>
      <div>{item.duration_semesters}</div>
      {/* <div>
        <form action={updateSyllabus}>
          <input type="hidden" name="syllabus_id" value={item.syllabus_id} hidden />
          <button type="submit">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </form>
      </div> */}
      <div>
        <form action={deleteSyllabus}>
          <input type="hidden" name="syllabus_id" value={item.id} hidden />
          <button type="submit">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </form>
      </div>
      <div>
        <Link href={`syllabus/${item.id}`}>View Courses</Link>
      </div>
    </li>
  ));
  return (
    <div>
      {/* <TableHeader titles={['Effective from year', 'Syllabus code', 'Duration in semesters', 'Edit', 'Delete']} /> */}
      <div className="bg-gray-200 rounded p-2 grid grid-cols-6 sticky top-0">
        <div>Effective from year</div>
        <div>Syllabus code</div>
        <div>Duration in semesters</div>
        {/* <div>Course Count</div> */}
        {/* <div>Edit</div> */}
        <div>Delete</div>
        <div>Courses</div>
      </div>
      <ul className="flex-col">
        {items}
      </ul>
      <ListTable data={syllabuses} />
    </div>
  )
}
