import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import MenuList from '@/components/UI/MenuList';
import { prisma } from '@/lib/db';

export default async function Layout({ children, params }: { children: ReactNode, params: any }) {
  let degree = await prisma.degree.findUniqueOrThrow({ where: { degree_id: parseInt(params.degree_id) } })
  .catch(() => {
    redirect('/dashboard');
  });
  const nav = ['analysis', 'syllabus', 'courses', 'batchs', 'enrollment', 'teaching', 'timetable', 'lectures', 'attendance', 'exams', 'grades', 'result', 'activities', 'placements'];

  return (
    <div className="h-full overflow-auto md:flex md:overflow-hidde">
      <div className='h-full min-h-full border-r'>
        <div className='bg-violet-100 font-bold border-b flex justify-center p-2'>{degree.degree_name_acronym}</div>
        <MenuList menus={nav} pathSegment='' />
      </div>
      {children}
    </div>
  );
}
