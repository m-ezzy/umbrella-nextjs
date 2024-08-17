import { ReactNode } from 'react'
import MenuList from '../../../../../../../../../components/MenuList5'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export default async function Layout({ children, params }: { children: ReactNode, params: { department_id: string, course_id: string } }) {
  const session: any = await auth()

  const teachings = await prisma.teaching.findMany({
    include: {
      division: {
        include: {
          batch: {
            include: {
              syllabus: {
                include: {
                  degree: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      course_id: parseInt(params.course_id),
      professor_id: session.user.id,
    },
  })

  const menus = teachings.map((teaching: any) => ({
    key: teaching.teaching_id,
    title: `${teaching.division.batch.syllabus.degree.degree_name_acronym} - ${teaching.division.batch.year_started} - ${teaching.division.division_name}`,
    link: `/dashboard/views/waterfall/professor/${params.department_id}/courses/${params.course_id}/teaching/${teaching.teaching_id}`,
    icon: '📜',
  }))

  return (
    <>
      <MenuList menus={menus} pathPosition={8} />
      {children}
    </>
  )
}
