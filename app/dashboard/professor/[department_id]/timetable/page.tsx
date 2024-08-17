// import { Session } from 'next-auth';
import TimetableView from '@/components/modules/timetable/TimetableViewAll'
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import SelectCourse from '@/components/selectors/course';

export default async function Page({ params }: { params: any }) {
  const session: any = await auth(); // type Session

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
        },
      },
      room: true,
    },
    where: {
      teaching: {
        professor_id: session.user.id,
      },
    },
  });

	const data = await prisma.teaching.findMany({
		include: {
			timetables: {
				include: {
					room: true,
				},
			},
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
		},
		where: {
			professor_id: session.user.id,
		},
	});
  return (
    <div className='w-full h-full overflow-auto p-2'>
      {/* {degrees.map(element => {
        return (
          <>
            <SelectBatch />
            <SelectSemester />
            <SelectCourse courses={data} />
          </>
        );
      })} */}

      {/* <SelectDegree /> */}

      {/* Select Batch */}

      {/* Select Division */}

      {/* Select Semester */}

      {/* Select Course */}

      <TimetableView timetableData={timetableData} showDegree={true} showProfessor={false} />
    </div>
  );
}
