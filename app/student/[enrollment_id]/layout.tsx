import { ReactNode } from 'react';
import MenuList from '@/components/MenuList';

export default function Layout({ children, params }: { children: ReactNode, params: any }) {
  const nav = ['courses', 'resourses', 'timetable', 'schedule', 'lectures', 'attendance', 'assignments', 'exams', 'grades', 'activities', 'grievances', 'placement', 'fees', 'Alumni'];
  // timetable, result
  
  return (
    <div className="h-full flex flex-wrap">
      <div className='bg-violet-100 border-r'>
        <MenuList menus={nav} pathSegment='' />
      </div>
      {children}
    </div>
  );
}
