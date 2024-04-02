import TimetableView from '@/components/timetable/TimetableViewAll'
import { prisma } from '@/lib/db';

export default async function Page({ params }: {params: { enrollment_id: string }}) {
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
