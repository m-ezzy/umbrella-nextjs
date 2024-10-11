import Link from 'next/link'
import { deleteUniversity } from '@/actions/university'
import DeleteForm from '@/components/ui/advanced/DeleteForm'
import ListTable from '@/components/ui/advanced/ListTable'

export default async function UniversityList({ data }: any) {
  const rows = data.map((university: any) => {
    return {
      id: university.id,
      Name: university.name,
      "Name Short": university.name_short,
      Departments: <Link href={`university/${university.id}/departments`} className="underline underline-offset-2">departments ({university._count.departments})</Link>,
      Campuses: <Link href={`university/${university.id}/campuses`} className="underline underline-offset-2">campuses ({university._count.campuses})</Link>,
      Delete: <DeleteForm objectName="University" id={university.id} serverAction={deleteUniversity} />,
      // "Action": {
      //   "Edit": {
      //     icon: 'edit',
      //     label: 'Edit',
      //     action: updateUniversity,
      //     id: university.id,
      //   },
      //   "Delete": {
      //     icon: 'delete',
      //     label: 'Delete',
      //     action: deleteUniversity,
      //     id: university.id,
      //   },
      // },
    }
  })
  return <ListTable data={rows} />
}
