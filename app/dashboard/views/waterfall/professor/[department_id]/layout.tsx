import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import MenuList from '../../_components/MenuList';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export default async function Layout({ children, params }: { children: ReactNode, params: { department_id: string } }) {
  const session: any = await auth();

  const faculty = await prisma.faculty.findFirst({
    where: {
      department_id: parseInt(params.department_id),
      user_id: session.user.user_id,
    },
  });
  
  if (!faculty) {
    // return <div>Unauthorized</div>
    redirect('/dashboard/views/waterfall/professor');
  }

  const menus = [
    // {
    //   key: 'analysis',
    //   title: 'Analysis',
    //   link: `/dashboard/views/waterfall/professor/${params.department_id}/analysis`,
    //   icon: 'assessment',
    // },
    {
      key: 'courses',
      title: 'Courses',
      link: `/dashboard/views/waterfall/professor/${params.department_id}/courses`,
      icon: 'school',
    },
    {
      key: 'resourses',
      title: 'Resourses',
      link: `/dashboard/views/waterfall/professor/${params.department_id}/resourses`,
      icon: 'library_books',
    },
    {
      key: 'activities',
      title: 'Activities',
      link: `/dashboard/views/waterfall/professor/${params.department_id}/activities`,
      icon: 'school',
    },
    {
      key: 'salary',
      title: 'Salary',
      link: `/dashboard/views/waterfall/professor/${params.department_id}/salary`,
      icon: 'school',
    },
  ]
  return (
    <>
      <MenuList menus={menus} pathPosition={5} />
      {children}
    </>
  );
}
