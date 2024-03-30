import { ReactNode } from 'react';
import MenuList from '@/components/UI/MenuList';
import { prisma } from '@/lib/db';

export default async function Layout({ children, params }: { children: ReactNode, params: { enrollment_id: string } }) {
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
    },
  })

  const nav = ['schedule', 'timetable', 'lectures', 'attendance', 'courses', 'resourses', 'assignments', 'exams', 'grades', 'activities', 'grievances', 'placement', 'transactions', 'alumni'];
  // timetable, result, fees
  
  return (
    <div className="h-full flex flex-wrap md:flex-nowrap">
      <div className='border-r'>
        <div className='bg-violet-100 font-bold flex justify-center p-2'>{enrollment?.batch.syllabus.degree.degree_name_acronym}</div>
        <MenuList menus={nav} pathSegment='' />
      </div>
      {children}
    </div>
  );
}
