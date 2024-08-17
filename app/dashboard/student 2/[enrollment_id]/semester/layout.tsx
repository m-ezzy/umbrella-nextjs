import { ReactNode } from 'react';
import MenuList from '../../../../../components/ui/MenuList4';
import { prisma } from '@/lib/db';

export default async function Layout({ children, params }: { children: ReactNode, params: { enrollment_id: string } }) {
  const enrollment = await prisma.enrollment.findUnique({
    select: {
      batch: {
        select: {
          syllabus: {
            select: {
              duration_semesters: true,
            },
          },
        },
      },
    },
    where: {
      enrollment_id: parseInt(params.enrollment_id),
    },
  })

  // if(!enrollment) return (<div>Enrollment not found</div>);
  if(!enrollment) throw new Error('Enrollment not found or you are not authorized to view this page.');

  const menus = [];
  for(let i = 1; i <= enrollment.batch.syllabus.duration_semesters; i++) {
    menus.push({
      key: i,
      title: `Semester ${i}`,
      link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${i}`,
      icon: '📚',
    });
  }

  // const menus = [
  //   { key: 'analysis', title: 'Analysis', link: `/dashboard/student/${params.enrollment_id}/semester/analysis`, icon: '📊' },
  //   { key: 'attendance', title: 'Attendance', link: `/dashboard/student/${params.enrollment_id}/semester/attendance`, icon: '📅' },
  //   { key: 'grades', title: 'Grades', link: `/dashboard/student/${params.enrollment_id}/semester/grades`, icon: '📝' },
  //   { key: 'schedule', title: 'Schedule', link: `/dashboard/student/${params.enrollment_id}/semester/schedule`, icon: '🕒' },
  // ];

  return (
    <div className="bg-white w-full h-full flex">
      <MenuList menus={menus} pathPosition={6} />
      <div className='w-full h-full border-l'>
        {children}
      </div>
    </div>
  );
}
