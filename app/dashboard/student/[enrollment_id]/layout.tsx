import { ReactNode } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import MenuList from '@/components/ui/MenuList';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export default async function Layout({ children, params }: { children: ReactNode, params: { enrollment_id: string } }) {
  const session: any = await auth();

  const enrollments = await prisma.enrollment.findUnique({
    select: {
      batch: {
        select: {
          syllabus: {
            select: {
              degree: {
                select: {
                  name_acronym: true
                },
              },
            },
          },
        },
      },
    },
    where: {
      id: parseInt(params.enrollment_id),
      user_id: session.user.id,
    },
  })

  // if(!enrollment) return (<div>Enrollment not found</div>);
  if(!enrollment) throw new Error('Enrollment not found or you are not authorized to view this page.');

  const nav = ['analysis', 'courses', 'teaching', 'timetable', 'sessions', 'attendance', 'assignments', 'resourses', 'grades', 'exams', 'results', 'activities', 'placements'];
  // 'schedule', 'fees', 'transactions', 'grievances', 'alumni'

  return (
    <div className="h-full flex flex-wrap md:flex-nowrap">
      <Sidebar>
        <div className='bg-violet-100 font-bold border-b p-2 flex justify-center'>{enrollment?.batch.syllabus.degree.name_acronym}</div>
        <MenuList menus={nav} pathSegment={`/dashboard/views/filter/student/${params.enrollment_id}`} />
      </Sidebar>
      {children}
    </div>
  );
}
