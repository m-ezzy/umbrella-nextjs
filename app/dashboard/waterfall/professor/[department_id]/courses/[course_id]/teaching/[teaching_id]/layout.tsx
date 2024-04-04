import { ReactNode } from 'react'
import MenuList from '../../../../../../_components/MenuList'

export default async function Layout({ children, params }: { children: ReactNode, params: { department_id: string, course_id: string, teaching_id: string } }) {
  const menus = [
    // {
    //   key: 'analysis',
    //   title: 'Analysis',
    //   link: `/dashboard/waterfall/professor/${params.department_id}/courses/${params.course_id}/analysis`,
    //   icon: 'assessment',
    // },
    {
      key: 'timetable',
      title: 'Timetable',
      link: `/dashboard/waterfall/professor/${params.department_id}/courses/${params.course_id}/teaching/${params.teaching_id}/timetable`,
      icon: 'schedule',
    },
    {
      key: 'sessions',
      title: 'Sessions',
      link: `/dashboard/waterfall/professor/${params.department_id}/courses/${params.course_id}/teaching/${params.teaching_id}/sessions`,
      icon: 'school',
    },
    {
      key: 'attendance',
      title: 'Attendance',
      link: `/dashboard/waterfall/professor/${params.department_id}/courses/${params.course_id}/teaching/${params.teaching_id}/attendance`,
      icon: 'assignment_ind',
    },
    {
      key: 'assignments',
      title: 'Assignments',
      link: `/dashboard/waterfall/professor/${params.department_id}/courses/${params.course_id}/teaching/${params.teaching_id}/assignments`,
      icon: 'assignment',
    },
    {
      key: 'exams',
      title: 'Exams',
      link: `/dashboard/waterfall/professor/${params.department_id}/courses/${params.course_id}/teaching/${params.teaching_id}/exams`,
      icon: 'assignment_turned_in',
    },
    {
      key: 'grades',
      title: 'Grades',
      link: `/dashboard/waterfall/professor/${params.department_id}/courses/${params.course_id}/teaching/${params.teaching_id}/grades`,
      icon: 'grading',
    },
  ]
  return (
    <>
      <MenuList menus={menus} pathPosition={9} />
      {children}
    </>
  );
}
