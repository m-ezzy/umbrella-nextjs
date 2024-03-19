import { ReactNode } from 'react';
import MenuList from '@/components/MenuList';

export default function Layout({ children, params }: { children: ReactNode, params: any }) {
  const nav = ['syllabus', 'courses', 'enrollment', 'teaching', 'timetable', 'lectures', 'attendance', 'exams', 'grades', 'result', 'activities'];
  
  return (
    <div className="h-full flex">
      <div className='h-full min-h-full bg-violet-200 border-r'>
        <MenuList menus={nav} pathSegment='' />
      </div>
      {children}
    </div>
  );
}
