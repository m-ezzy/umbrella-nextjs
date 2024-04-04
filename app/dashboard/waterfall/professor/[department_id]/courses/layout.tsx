import { ReactNode } from 'react'
import MenuList from '../../../_components/MenuList'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export default async function Layout({ children, params }: { children: ReactNode, params: { department_id: string } }) {
  const session: any = await auth();

  const courses = await prisma.course.findMany({
    where: {
      department_id: parseInt(params.department_id),
      teaching: {
        some: {
          professor_id: parseInt(session.user.user_id),
        },
      },
    },
  });

  const menus = courses.map((course: any) => ({
    key: course.course_id,
    title: course.course_name_acronym,
    link: `/dashboard/waterfall/professor/${params.department_id}/courses/${course.course_id}`,
    icon: '📜',
  }));

  return (
    <>
      <MenuList menus={menus} pathPosition={6} />
      {children}
    </>
  );
}
