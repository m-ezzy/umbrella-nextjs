import prisma from "@/lib/prisma";

export default async function Page({ params }: any) {
  const data = await prisma.session_attendance.findMany({
    include: {
      session: {
        include: {
          teaching: {
            include: {
              course: {
                include: {
                  syllabus_course: true,
                },
              },
              division: true,
              professor: true,
            },
          },
          room: {
            include: {
              floor: true,
            }
          }
        },
      },
    },
    where: {
      session: {
        teaching: {
          division: {
            enrollments: {
              some: {
                enrollment_id: parseInt(params.enrollment_id),
              }
            }
          }
        }
      }
    },
  });

  const items = data.map((item: any) => {
    // Format hours and minutes to have leading zeros if necessary
    // hours = (hours < 10 ? '0' : '') + hours;
    // minutes = (minutes < 10 ? '0' : '') + minutes;

    // also put zero(0) dynamically in room number

    return(
      <li key={item.session_id} className="border-b p-2 grid grid-cols-8">
        <div>{item.session.teaching.course.syllabus_course[0].course_semester}</div>
        <div>{item.session.teaching.course.course_name}</div>
        <div>{item.session.teaching.professor.name_prefix} {item.session.teaching.professor.name_first} {item.session.teaching.professor.name_sur}</div>
        <div>{item.session.date.toLocaleDateString()}</div>
        <div>{item.session.time_start.getUTCHours()}:{item.session.time_start.getUTCMinutes()}</div>
        <div>{item.session.time_end.getUTCHours()}:{item.session.time_end.getUTCMinutes()}</div>
        <div>{item.session.room.floor.floor_number}0{item.session.room.room_number}</div>
        <div>{item.status}</div>
      </li>
    );
  });

  return (
    <div className="w-full p-2 space-y-2">
      {/* <SessionFilter /> */}
      <div className="overflow-auto relative">
        <div className="bg-gray-200 rounded p-2 grid grid-cols-8 sticky top-0">
          <div>Semester</div>
          <div>Course</div>
          <div>Professor</div>
          <div>Date</div>
          <div>Start Time</div>
          <div>End Time</div>
          <div>Venue</div>
          <div>Attendance Status</div>
        </div>
        <ul className="flex-col gap-2">
          {items}
        </ul>
      </div>
    </div>
  );
}
