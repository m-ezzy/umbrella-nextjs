import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/UI/Sidebar';
import MenuList from '@/app/dashboard/views/filter/_components/MenuList';
import { prisma } from '@/lib/db';

export default async function Layout({ children, params }: { children: ReactNode, params: any }) {
  const department: any = await prisma.department.findUniqueOrThrow({
    where: {
      department_id: parseInt(params.department_id),
    },
  })
  .catch(() => {
    return { error: 'Unknown' };
  });

  if(department.error) {
    redirect('/dashboard');
  }

  const nav = ['analysis', 'teaching', 'courses', 'timetable', 'sessions', 'attendance', 'assignments', 'exams', 'grades'];
  // 'resourses', 'schedule', 'salary'
  return (
    <div className="h-full flex">
      <Sidebar>
        <div className='bg-violet-100 font-bold border-b p-2 flex justify-center'>{department.department_name_acronym}</div>
        <MenuList menus={nav} pathSegment={`/dashboard/views/filter/professor/${params.department_id}`} />
      </Sidebar>
      {children}
    </div>
  );
}
