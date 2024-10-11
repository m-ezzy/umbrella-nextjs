import prisma from "@/lib/prisma"
import { auth } from '@/lib/auth'
import TeachingList from '@/components/lists/TeachingList'

// export default async function Page({ params }: {params: { enrollment_id: string }}) {
export default async function Page() {
  const session: any = await auth()

  let data: any = await prisma.teaching.findMany({
    include: {
      batch: true,
      division: true,
      course: true,
      professor: true,
    },
    where: {
      division: {
        enrollments: {
          some: {
            user_id: session.user.id,
          },
        },
      },
    },
  })
  .catch((error) => {
    console.error(error)
    return []
  })
  return (
    <>
      <TeachingList role="student" data={data} />
    </>
  )
}
