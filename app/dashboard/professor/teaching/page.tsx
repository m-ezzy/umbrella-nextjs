// import TeachingList from '../../../../components/lists/TeachingListProfessor';
import { auth } from '@/lib/auth';
import prisma from "@/lib/prisma";

export default async function Page({ params }: {params: { department_id: string }}) {
  const session: any = await auth();

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
                      degree_name_short: true,
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
      professor_id: parseInt(session.user.id),
      // department filter
    },
  });
  // console.log(teaching);

  return (
    <div className='w-full p-2 overflow-auto'>
      {/* <TeachingList teaching={teaching} /> */}
    </div>
  );
}
