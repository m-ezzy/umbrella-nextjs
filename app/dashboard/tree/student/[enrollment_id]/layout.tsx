import { ReactNode } from 'react';
import MenuList from '../../_components/MenuList';
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

  const menus = [
    {
      key: 'analysis',
      title: 'Analysis',
      link: `/dashboard/tree/student/${params.enrollment_id}/analysis`,
      icon: 'assessment',
    },
    {
      key: 'semester',
      title: 'Semester',
      link: `/dashboard/tree/student/${params.enrollment_id}/semester`,
      icon: 'school',
    },
    {
      key: 'resourses',
      title: 'Resourses',
      link: `/dashboard/tree/student/${params.enrollment_id}/resourses`,
      icon: 'library_books',
    },
    {
      key: 'results',
      title: 'Results',
      link: `/dashboard/tree/student/${params.enrollment_id}/results`,
      icon: 'school',
    },
    {
      key: 'activities',
      title: 'Activities',
      link: `/dashboard/tree/student/${params.enrollment_id}/activities`,
      icon: 'school',
    },
    {
      key: 'placements',
      title: 'Placements',
      link: `/dashboard/tree/student/${params.enrollment_id}/placements`,
      icon: 'school',
    },
  ]

  return (
    <div className="bg-zinc-400 h-full flex flex-wrap md:flex-nowrap">
      <MenuList menus={menus} pathPosition={5} />
      <div className='w-full h-full border-l'>
        {children}
      </div>
    </div>
  );
}
