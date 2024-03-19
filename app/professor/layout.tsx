import { ReactNode } from 'react';
import MenuList from '@/components/MenuList';

export default function Layout({ children, params }: { children: ReactNode, params: any }) {
  const nav = ['courses', 'resourses', 'schedule', 'timetable', 'lectures', 'attendance', 'assignments', 'exams', 'grades', 'salary'];

  return (
    <div className="h-full flex">
      <div className='h-full min-h-full bg-violet-200 border-r'>
        <MenuList menus={nav} pathSegment='/professor' />
      </div>
      {children}
    </div>
  );
}
