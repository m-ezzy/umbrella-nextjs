import Link from 'next/link'
import { deleteTeaching } from '@/actions/teaching'
import DeleteForm from '@/components/ui/advanced/DeleteForm'
import ListTable from '@/components/ui/advanced/ListTable'

export default async function TeachingList({ role, data }: any) {
  let dataset: any[] = data.map((teaching: any) => {
    return {
      id: teaching.id,
      // Degree: teaching.division.batch.syllabus.degree.name,
      Batch: teaching.batch.start_year,
      Division: teaching.division.name,
      Professor: teaching.professor.name_prefix + ' ' + teaching.professor.name_first + ' ' + teaching.professor.name_last + ' ' + teaching.professor.name_suffix,
      Course: teaching.course.name,
      Semester: teaching.course.semester,
      Sessions: <Link href={`teaching/${teaching.id}/sessions`}>sessions</Link>,
      Assignments: <Link href={`teaching/${teaching.id}/assignments`}>assignments</Link>,
      Delete: <DeleteForm objectName="Teaching" id={teaching.id} serverAction={deleteTeaching} />
    }
  })
  return <ListTable data={dataset} />
}
