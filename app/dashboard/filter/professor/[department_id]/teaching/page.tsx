import TeachingList from './TeachingList';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export default async function Page({ params }: {params: { department_id: string }}) {
  let session: any = await auth();

  let teaching: any = await prisma.teaching.findMany({
    select: {
      teaching_id: true,
      course: {
        select: {
          course_id: true,
          course_name: true,
          syllabus_course: {
            select: {
              course_semester: true,
            },
          },
        },
      },
      division: {
        select: {
          division_id: true,
          division_name: true,
          batch: {
            select: {
              batch_id: true,
              year_started: true,
              syllabus: {
                select: {
                  degree: {
                    select: {
                      degree_id: true,
                      degree_name: true,
                      degree_name_acronym: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    where: {
      professor_id: parseInt(session.user.user_id),
      // department filter
    },
  });
  console.log(teaching);

  return (
    <div className='w-full p-2 overflow-auto'>
      <TeachingList teaching={teaching} />
    </div>
  );
}
