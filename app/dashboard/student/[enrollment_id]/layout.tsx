import { ReactNode } from 'react';
import { selectById } from '@/models/Degree';
import MenuList from '@/components/MenuList';

export default async function Layout({ children, params }: { children: ReactNode, params: { degree_id: number } }) {
  const degree = await selectById(params.degree_id);

  const nav = ['courses', 'resourses', 'timetable', 'schedule', 'lectures', 'attendance', 'assignments', 'exams', 'grades', 'activities', 'grievances', 'placement', 'fees', 'Alumni'];
  // timetable, result
  
  return (
    <div className="h-full flex flex-wrap">
      <div className='bg-violet-100 border-r'>
      <div className='bg-white font-bold flex justify-center p-2'>{degree[0].degree_name_acronym}</div>
        <MenuList menus={nav} pathSegment='' />
      </div>
      {children}
    </div>
  );
}
