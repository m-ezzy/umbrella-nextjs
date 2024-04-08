import TimetableView from '@/components/timetable/TimetableViewAll'
import { prisma } from '@/lib/db';

export default async function Page({ params }: any) {
  const timetableData = await prisma.timetable.findMany({
    include: {
      teaching: {
        include: {
          course: true,
          division: {
            include: {
              batch: {
                include: {
                  syllabus: {
                    include: {
                      degree: true,
                    },
                  },
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
      teaching_id: parseInt(params.teaching_id),
    },
  });
  return (
    <div className='w-full h-full overflow-auto p-2'>
      {/* you don't even need to show the degree and course in cell anymore. it's in the path the you followed till here */}
      <TimetableView timetableData={timetableData} showDegree={true} showProfessor={false} />
    </div>
  );
}
