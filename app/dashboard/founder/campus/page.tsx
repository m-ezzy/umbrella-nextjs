import prisma from "@/lib/prisma"
import { auth } from '@/lib/auth'
import { createCampus, deleteCampus } from '@/actions/campus'
import CreateForm from '@/components/ui/advanced/CreateForm'
import ListTable from '@/components/ui/advanced/ListTable'

export default async function Page() {
  const session:any = await auth()

  // const { filters, setFilters }: any = useFounderFilters();

  let campuses: any[] = await prisma.campus.findMany({
    where: {
      university: {
        user_id: session.user.id,
      },
    },
  })

  const createFormFields: any[] = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
    },
    {
      type: 'text',
      label: 'Address',
      name: 'address',
    },
    {
      type: 'text',
      label: 'City',
      name: 'city',
    },
    {
      type: 'text',
      label: 'State',
      name: 'state',
    },
    {
      type: 'text',
      label: 'Country',
      name: 'country',
    },
    {
      type: 'text',
      label: 'Pincode',
      name: 'pincode',
    },
    {
      type: 'number',
      label: 'Gate Count',
      name: 'gate_count',
    },
    {
      type: 'hidden',
      name: 'university_id',
      // defaultValue: filters.university.selected[0],
    },
  ]
  const newFilters: any = [
    {
      label: 'Name',
      options: campuses.map((university: any) => ({ name: university.name, value: university.id })),
    },
    {
      label: 'Address',
      options: campuses.map((university: any) => ({ name: university.address, value: university.id })),
    },
  ]

  // setFilters(prev => filters);
  
  return (
    <>
      <CreateForm objectName='Campus' fields={createFormFields} serverAction={createCampus} />
      {campuses.length ? <ListTable data={campuses} /> : <div>No campuses found</div>}
    </>
  )
}
