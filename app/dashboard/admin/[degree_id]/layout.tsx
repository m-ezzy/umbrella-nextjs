import { ReactNode } from 'react';
import { selectById } from '@/models/Degree';
import MenuList from '@/components/UI/MenuList';

export default async function Layout({ children, params }: { children: ReactNode, params: any }) {
  const degree = await selectById(params.degree_id);

  const nav = ['syllabus', 'courses', 'batchs', 'enrollment', 'teaching', 'timetable', 'lectures', 'attendance', 'exams', 'grades', 'result', 'activities', 'placements'];

  return (
    <div className="h-full overflow-hidden flex">
      <div className='h-full min-h-full bg-violet-100 border-r'>
        <div className='bg-white font-bold flex justify-center p-2'>{degree[0].degree_name_acronym}</div>
        <MenuList menus={nav} pathSegment='' />
      </div>
      {children}
    </div>
  );
}
