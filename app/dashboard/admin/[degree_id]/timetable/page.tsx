import TimetableUltimate from '@/components/modules/timetable/TimetableUltimate'
import { prisma } from '@/lib/db';

export default async function Page({ params }: {params: { degree_id: string }}) {
  const roomData = await prisma.room.findMany({
    include: {
      floor: {
        include: {
          building: true,
        },
      },
    },
  });

  const teachingData = await prisma.teaching.findMany({
    include: {
      course: {
        include: {
          syllabus_course: true,
        },
      },
      division: {
        include: {
          batch: true,
        },
      },
      professor: true,
    },
    where: {
      division: {
        batch: {
          syllabus: {
            degree_id: parseInt(params.degree_id),
          },
        },
      },
    }
  });
  // console.log(teachingData);

  const timetableData = await prisma.timetable.findMany({
    include: {
      teaching: {
        include: {
          course: {
            include: {
              syllabus_course: true,
            },
          },
          division: {
            include: {
              batch: true,
            },
          },
          professor: true,
        },
      },
      room: {
        include: {
          floor: {
            include: {
              building: true,
            },
          }
        },
      }
    },
    where: {
      teaching: {
        division: {
          batch: {
            syllabus: {
              degree_id: parseInt(params.degree_id),
            },
          },
        },
      },
    },
  });
  // console.log(timetableData);

  return (
    <div className='w-full overflow-auto'>
      <TimetableUltimate roomData={roomData} teachingData={teachingData} timetableData={timetableData} />
    </div>
  );
}
