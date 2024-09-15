import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function Page({ params }: any) {
  const session: any = await auth();

  const attendances = await prisma.session_attendance.findMany({
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
            },
          },
        },
      },
    },
    where: {
      session: {
        teaching: {
          professor_id: session.user.id,
        },
      },
    },
  });
  return (
    <div>
      <h1>Attendance of Students</h1>
      <ul>
        {attendances.map((attendance: any) => (
          <li key={attendance.session_id}>
            <div>{attendance.session.teaching.course.syllabus_course[0].course_semester}</div>
            <div>{attendance.session.teaching.course.course_name}</div>
            <div>{attendance.session.teaching.professor.name_prefix} {attendance.session.teaching.professor.name_first} {attendance.session.teaching.professor.name_sur}</div>
            <div>{attendance.session.date.toLocaleDateString()}</div>
            <div>{attendance.session.time_start.getUTCHours()}:{attendance.session.time_start.getUTCMinutes()}</div>
            <div>{attendance.session.time_end.getUTCHours()}:{attendance.session.time_end.getUTCMinutes()}</div>
            <div>{attendance.session.room.floor.floor_number}0{attendance.session.room.room_number}</div>
            <div>{attendance.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
