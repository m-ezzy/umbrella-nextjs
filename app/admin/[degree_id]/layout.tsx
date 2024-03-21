import { ReactNode } from 'react';
import MenuList from '@/components/MenuList';

export default function Layout({ children, params }: { children: ReactNode, params: any }) {
  const nav = ['syllabus', 'courses', 'batchs', 'enrollment', 'teaching', 'timetable', 'lectures', 'exams', 'grades', 'result', 'activities'];

  return (
    <div className="h-full overflow-hidden flex">
      <div className='h-full min-h-full bg-violet-100 border-r'>
        <div className='bg-white font-bold flex justify-center p-2'>{params.degree_id}</div>
        <MenuList menus={nav} pathSegment='' />
      </div>
      {children}
    </div>
  );
}
