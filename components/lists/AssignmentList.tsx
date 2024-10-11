import Link from "next/link"
import { deleteAssignment } from "@/actions/assignment"
import ListTable from "@/components/ui/advanced/ListTable"
import DeleteForm from "@/components/ui/advanced/DeleteForm"

export default function AssignmentList({
  data, batch_id, division_id, course_id, professor_id, teaching_id, assignment_id
}: any) {
  let dataset: any[] = data?.map((assignment: any) => {
    return {
      id: assignment.id,
      Title: assignment.title,
      Description: assignment.description,
      Deadline: assignment.deadline,
      Format: assignment.format,
      Submissions: <><Link href={`assignments/${assignment.id}/submissions`}>submissions</Link> ({assignment._count.submissions})</>,
      Divisions: <><Link href={`assignments/${assignment.id}/groups`}>groups</Link> ({assignment._count.groups})</>,
      Delete: <DeleteForm objectName="Assignment" id={assignment.id} serverAction={deleteAssignment} />,
    }
  })
  return <ListTable data={dataset} />
}
