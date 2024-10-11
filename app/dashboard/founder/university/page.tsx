// "use client"

import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { useFounderContext } from '@/contexts/FounderContext'
import UniversityModal from '@/components/forms/UniversityForm'
import UniversityList from '@/components/lists/UniversityList'

export default async function Page({ params, searchParams }: any) {
  const session:any = await auth()
  console.log(params, searchParams)

  const founderUniversity: any[] = await prisma.university.findMany({
    select: {
      id: true,
      name: true,
      name_short: true,
      _count: {
        select: {
          campuses: true,
          departments: true,
        },
      },
    },
    where: {
      user_id: session.user.id,
    },
  })

  // const createFormFields: any[] = [
  //   {
  //     type: 'text',
  //     label: 'Name',
  //     name: 'name',
  //   },
  //   {
  //     type: 'text',
  //     label: 'Name Short',
  //     name: 'name_short',
  //   },
  // ]

  // const filters: any = [
  //   {
  //     label: 'University Name',
  //     options: founderUniversity.map((university: any) => ({ name: university.name, value: university.id })),
  //   },
  //   {
  //     label: 'University Name Short',
  //     options: founderUniversity.map((university: any) => ({ name: university.name_short, value: university.id })),
  //   },
  // ]

  // const { filters, setFilters }: any = useFounderContext()

  // setFilters((prev: any) => filters);

  return (
    <>
      {/* <ActionForm type='create' fields={createFormFields} serverAction={createUniversity} button={{ icon: 'add', label: 'Create University' }} /> */}
      {/* <CreateForm objectName='University' fields={createFormFields} serverAction={createUniversity} /> */}
      <UniversityModal />
      <UniversityList data={founderUniversity} />
    </>
  )
}
