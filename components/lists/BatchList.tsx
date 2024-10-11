"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { deleteBatch } from "@/actions/batch"
import { useAdminContext } from "@/contexts/AdminContext"
import ListTable from "@/components/ui/advanced/ListTable"
import DeleteForm from "@/components/ui/advanced/DeleteForm"

export default function BatchList({ data, degree_id, syllabus_id }: any) {
  // const [batches, setBatches] = useState([])
  const [view, setView] = useState("list")

  // const { filters, syllabus }: any = useAdminContext()
  // let batch_id = null
  // let degree_id = null
  // let syllabus_id = null

  let dataset: any[] = data?.map((batch: any) => {
    return {
      "id": batch.id,
      "Start Year": batch.start_year,
      "Finish Year": batch.finish_year ?? "",
      "Current Semester": batch.current_semester,
      "Enrollments": <><Link href={`batches/${batch.id}/enrollments`} className="text-violet-400 underline">enrollments</Link> ({batch._count.enrollments})</>,
      "Divisions": <><Link href={`batches/${batch.id}/divisions`} className="text-violet-400 underline">divisions</Link> ({batch._count.divisions})</>,
      "Edit": <Link href={`batches/${batch.id}/edit`} className="text-violet-400 underline">edit</Link>,
      "Delete": <DeleteForm objectName="Batch" id={batch.id} serverAction={deleteBatch.bind(null, batch.id)} />,
    }
  })
  return (view === "list" ? <ListTable data={dataset} /> : null)
}

// import Link from "next/link";
// import DivisionList from "@/components/lists/DivisionList";
// import { updateBatch, deleteBatch } from "@/actions/batch";

// export default async function BatchList({ degree_id, syllabus, batches }: { degree_id: number, syllabus: any, batches: any }) {
//   const batchItems = batches.map((item: any) => (
//     <li key={item.batch_id} className="bg-gray-300 min-w-60 min-h-60 rounded-md p-2 space-y-4">
//       <div className="flex justify-end gap-1">
//         <form action={updateBatch}>
//           <input type="hidden" name="batch_id" value={item.batch_id} hidden />
//           <button type="submit">
//             <span className="material-symbols-outlined">edit</span>
//           </button>
//         </form>
//         <form action={deleteBatch}>
//           <input type="hidden" name="batch_id" value={item.batch_id} hidden />
//           <button type="submit">
//             <span className="material-symbols-outlined">delete</span>
//           </button>
//         </form>
//       </div>
//       <Link href={`/dashboard/admin/${0}/batch/${item.batch_id}/`} className="grid justify-center">
//         <p>Start Year: {item.year_started}</p>
//         <p>End Year: {item.year_ended ? item.year_ended : "----"}</p>
//         <p>Syllabus: Effective from {item.syllabus.year_effective}</p>
//         <p>Enrolled: {item._count.enrollments}</p>
//       </Link>
//       <DivisionList batch_id={item.batch_id} divisions={item.divisions} />
//     </li>
//   ));
//   return (
//     <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
//       {batchItems}
//     </ul>
//   );
// }
