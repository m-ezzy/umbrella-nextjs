import Link from "next/link"
import { updateDepartment, deleteDepartment } from '@/actions/department'
import DeleteForm from '@/components/ui/advanced/DeleteForm'
import ListTable from '@/components/ui/advanced/ListTable'

export default async function DepartmentList({ data }: any) {
  const rows: any = data.map((department: any) => {
    return {
      "id": department.id,
      "Name": department.name,
      "Name Short": department.name_short,
      "Degrees": <Link href={`department/${department.id}/degrees`}>{department._count.degrees}</Link>,
      "Faculties": <Link href={`department/${department.id}/faculties`}>{department._count.faculties}</Link>,
      "Edit": <Link href={`department/${department.id}`}>Edit</Link>,
      "Delete": <DeleteForm objectName="Department" id={department.id} serverAction={deleteDepartment} />
    }
  })
  // const rows: any = data.map((department: any) => {
  //   return {
  //     id: department.id,
  //     Name: department.name,
  //     "Name Short": department.name_short,
  //     Links: {
  //       "Degrees": <Link href={`department/${department.id}/degrees`}>{department._count.degrees}</Link>,
  //       "Faculties": <Link href={`department/${department.id}/faculties`}>{department._count.faculties}</Link>,
  //     },
  //     Actions: {
  //       Edit: updateDepartment,
  //       Delete: deleteDepartment,
  //     }
  //   }
  // })
  // const rows: any = data.map((department: any) => {
  //   return [
  //     {
  //       column: "id",
  //       content: department.id,
  //       type: "text",
  //     },
  //     {
  //       column: "Name",
  //       content: department.name,
  //       type: "text",
  //     },
  //     {
  //       column: "Name Short",
  //       content: department.name_short,
  //       type: "text",
  //     },
  //     {
  //       column: "Degrees",
  //       content: <Link href={`department/${department.id}/degrees`}>{department._count.degrees}</Link>,
  //       type: "link",
  //     },
  //     {
  //       column: "Faculties",
  //       content: <Link href={`department/${department.id}/faculties`}>{department._count.faculties}</Link>,
  //       type: "link",
  //     },
  //     {
  //       column: "Edit",
  //       content: <Link href={`department/${department.id}`}>Edit</Link>,
  //       type: "action",
  //     },
  //     {
  //       column: "Delete",
  //       content: <DeleteForm objectName="Department" id={department.id} serverAction={deleteDepartment} />,
  //       type: "action",
  //     },
  //   ]
  // })
  return <ListTable data={rows} />
}
