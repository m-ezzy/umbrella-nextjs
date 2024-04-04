import { ReactNode } from 'react';
import Sidebar from '@/components/UI/Sidebar';
import MenuList from '@/components/UI/MenuList';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export default async function Layout({ children, params }: { children: ReactNode, params: { enrollment_id: string } }) {
  const session: any = await auth();

  const enrollment = await prisma.enrollment.findUnique({
    select: {
      batch: {
        select: {
          syllabus: {
            select: {
              degree: {
                select: {
                  degree_name_acronym: true
                },
              },
            },
          },
        },
      },
    },
    where: {
      enrollment_id: parseInt(params.enrollment_id),
      user_id: session.user.user_id,
    },
  })

  // if(!enrollment) return (<div>Enrollment not found</div>);
  if(!enrollment) throw new Error('Enrollment not found or you are not authorized to view this page.');

  const nav = ['analysis', 'courses', 'teaching', 'timetable', 'sessions', 'attendance', 'assignments', 'resourses', 'grades', 'exams', 'results', 'activities', 'placements'];
  // 'schedule', 'fees', 'transactions', 'grievances', 'alumni'

  return (
    <div className="h-full flex flex-wrap md:flex-nowrap">
      <Sidebar>
        <div className='bg-violet-100 font-bold border-b p-2 flex justify-center'>{enrollment?.batch.syllabus.degree.degree_name_acronym}</div>
        <MenuList menus={nav} pathSegment={`/dashboard/student/${params.enrollment_id}`} />
      </Sidebar>
      {children}
    </div>
  );
}
