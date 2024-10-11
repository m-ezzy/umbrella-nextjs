import Link from "next/link"
import { deleteDegree } from '@/actions/degree'
import DeleteForm from '@/components/ui/advanced/DeleteForm'
import ListTable from '@/components/ui/advanced/ListTable'
import useSWR from "swr"

export default async function DegreeList({ data, university_id, department_id }: any) {
  let university = useSWR([university_id], () => createDegree({ university_id }))
  let department = useSWR([department_id], () => createDegree({ department_id }))
  
  const rows: any = data.map((degree: any) => {
    return {
      id: degree.id,
      Name: degree.name,
      "Name Short": degree.name_short,
      Type: degree.type,
      Admins: <Link href={`degree/${degree.id}/admins`}>{degree._count.admins}</Link>,
      Syllabuses: <Link href={`degree/${degree.id}/syllabuses`}>{degree._count.syllabuses}</Link>,
      Edit: <Link href={`degree/${degree.id}`}>Edit</Link>,
      Delete: <DeleteForm objectName="Degree" id={degree.id} serverAction={deleteDegree} />
    }
  })
  return <ListTable data={rows} />
}
