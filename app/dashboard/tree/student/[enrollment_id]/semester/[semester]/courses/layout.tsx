import { ReactNode } from 'react';
import MenuList from '../../../../../_components/MenuList';
import { prisma } from '@/lib/db';

export default async function Layout({ children, params }: { children: ReactNode, params: { enrollment_id: string, semester: string } }) {
  const courses = await prisma.course.findMany({
    include: {
      syllabus_course: {
        include: {
          syllabus: true,
        },
      },
    },
    where: {
      syllabus_course: {
        some: {
          course_semester: parseInt(params.semester),
          syllabus: {
            batch: {
              some: {
                enrollments: {
                  some: {
                    enrollment_id: parseInt(params.enrollment_id)
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const menus = courses.map((course: any) => ({
    key: course.course_id,
    title: course.course_name_acronym,
    link: `/dashboard/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${course.course_id}`,
    icon: '📜',
  }));

  return (
    <div className="bg-white w-full h-full flex">
      <MenuList menus={menus} pathPosition={8} />
      <div className='w-full h-full border-l'>
        {children}
      </div>
    </div>
  );
}
