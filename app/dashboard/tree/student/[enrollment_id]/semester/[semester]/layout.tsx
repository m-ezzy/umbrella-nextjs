import { ReactNode } from 'react';
import MenuList from '../../../../_components/MenuList';

export default async function Layout({ children, params }: { children: ReactNode, params: { enrollment_id: string, semester: number } }) {
  const menus = [
    { key: 'analysis', title: 'Analysis', link: `/dashboard/tree/student/${params.enrollment_id}/semester/${params.semester}/analysis`, icon: '📊' },
    { key: 'courses', title: 'Courses', link: `/dashboard/tree/student/${params.enrollment_id}/semester/${params.semester}/courses`, icon: '📚' },
    { key: 'schedule', title: 'Schedule', link: `/dashboard/tree/student/${params.enrollment_id}/semester/${params.semester}/schedule`, icon: '🕒' },
    { key: 'timetable', title: 'Timetable', link: `/dashboard/tree/student/${params.enrollment_id}/semester/${params.semester}/timetable`, icon: '🕒'},
    // { key: 'attendance', title: 'Attendance', link: `/dashboard/tree/student/${params.enrollment_id}/semester/${params.semester}/attendance`, icon: '📅' },
    // { key: 'grades', title: 'Grades', link: `/dashboard/tree/student/${params.enrollment_id}/semester/${params.semester}/grades`, icon: '📝' },
  ];
  return (
    <div className="bg-zinc-400 w-full h-full flex">
      <MenuList menus={menus} pathPosition={7} />
      <div className='w-full h-full border-l'>
        {children}
      </div>
    </div>
  );
}
