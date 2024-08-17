import TimetableView from '@/components/modules/timetable/TimetableViewAll'
import { prisma } from '@/lib/db';
import { auth } from '@/auth';

export default async function Page({ params }: {params: { enrollment_id: string }}) {
  const session: any = await auth();

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
            // every: {
              // user_id: session.user.id,
            // },
            some: {
              id: parseInt(session.user.id),
            },
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
      {/* <form action={setSemester}>
        <select name="semester" id="semester">
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
          <option value="5">Semester 5</option>
          <option value="6">Semester 6</option>
          <option value="7">Semester 7</option>
          <option value="8">Semester 8</option>
        </select>
        <input type="submit" value="Submit" />
      </form> */}
      <TimetableView timetableData={timetableData} showDegree={false} showProfessor={true} />
    </div>
  );
}
