import TimetableView from '@/components/modules/timetable/TimetableViewAll'
import { prisma } from '@/lib/db';

export default async function Page({ params }: { params: { enrollment_id: string, semester: string } }) {
  const timetableData = await prisma.timetable.findMany({
    include: {
      teaching: {
        include: {
          course: true,
          division: {
            include: {
              batch: {
                include: {
                  syllabus: true,
                },
              },
            },
          },
          professor: true,
        },
      },
      room: true,
    },
    where: {
      teaching: {
        division: {
          enrollments: {
            some: {
              enrollment_id: parseInt(params.enrollment_id)
            }
          },
        },
      },
    }
  });

  // async function setSemester(event: any) {
  //   "use server";
  //   const semester = event.target.elements.semester.value;
  // }
  
  return (
    <div className='w-full h-full overflow-auto p-2'>
      <TimetableView timetableData={timetableData} showDegree={false} showProfessor={true} />
    </div>
  );
}
