import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/UI/Sidebar';
import MenuList from '@/app/dashboard/views/filter/_components/MenuList';
import { prisma } from '@/lib/db';

export default async function Layout({ children, params }: { children: ReactNode, params: any }) {
  let degree = await prisma.degree.findUniqueOrThrow({ where: { degree_id: parseInt(params.degree_id) } })
  .catch(() => {
    redirect('/dashboard');
  });

  const nav = ['analysis', 'courses', 'syllabus', 'batchs', 'enrollment', 'teaching', 'timetable', 'exams', 'grades', 'result', 'activities', 'placements'];
  // 'chapters', 'sessions', 'attendance'

  return (
    <div className="h-full overflow-auto md:flex md:overflow-hidde">
      <Sidebar>
        <div className='bg-violet-100 font-bold border-b p-2 flex justify-center'>{degree.degree_name_acronym}</div>
        <MenuList menus={nav} pathSegment={`/dashboard/views/filter/admin/${params.degree_id}`} />
      </Sidebar>
      {children}
    </div>
  );
}
