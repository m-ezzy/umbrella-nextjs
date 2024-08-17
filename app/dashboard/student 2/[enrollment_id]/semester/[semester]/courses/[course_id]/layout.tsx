import { ReactNode } from 'react';
import MenuList from '../../../../../../../../components/ui/MenuList4';

export default async function Layout({ children, params }: { children: ReactNode, params: { enrollment_id: string, semester: number, course_id: string } }) {
  const menus = [
    { key: 'analysis', title: 'Analysis', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/analysis`, icon: '📊' },
    { key: 'description', title: 'Description', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/description`, icon: '📚' }, // code, type, category, credits, books, chapters, objectives, outcome, ...
    { key: 'content', title: 'Content', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/content`, icon: '📚' },
    // { key: 'schedule', title: 'Schedule', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/schedule`, icon: '🕒' },
    { key: 'timetable', title: 'Timetable', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/timetable`, icon: '🕒' },
    { key: 'sessions', title: 'Sessions', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/sessions`, icon: '🕒' },
    { key: 'attendance', title: 'Attendance', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/attendance`, icon: '📅' },
    { key: 'assignments', title: 'Assignments', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/assignments`, icon: '📝' },
    { key: 'exams', title: 'Exams', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/exams`, icon: '📝' },
    { key: 'grades', title: 'Grades', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/grades`, icon: '📝' },
  ];
  return (
    <div className="bg-zinc-400 w-full h-full flex">
      <MenuList menus={menus} pathPosition={9} />
      <div className='w-full h-full border-l'>
        {children}
      </div>
    </div>
  );
}
