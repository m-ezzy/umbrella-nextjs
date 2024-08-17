import Image from "next/image";
import Link from "next/link";
import SessionCreate from "@/components/modules/session/SessionCreate"
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function Page() {
  const session:any = await auth();

  // get all the teaching of the professor. get unique degrees, batchs of the degree, divisions of that degree, courses of that division that they are assigned to teach
  // const teaching:any = await getTeaching(session.user.id).catch(error => console.error(error))
  const teaching:any = await prisma.teaching.findMany({
    where: {
      professor_id: session.user.id
    },
  }).catch(error => console.error(error))

  // get all the rooms in the campus
  const rooms = await prisma.room.findMany().catch(error => console.error(error))

  // get all the sessions of the professor to display. don't find unique degrees, batchs, divisions and courses from here.
  // your're not just filtering but also creating sessions. that data will not be in previous session
  const sessions:any = await prisma.session.findMany({
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
      room: {
        include: {
          floor: true,
        },
      },
    },
    where: {
      teaching: {
        professor_id: session.user.id,
      },
    },
  }).catch(error => console.error(error))

  // check the timetable to see if current session can be created from timetable automatically
  const timetable:any = await prisma.timetable.findMany({
    where: {
    },
  }).catch(error => console.error(error))

  const items: any = sessions.map((session:any) => {
    return (
      <tr key={session.session_id} className="*:border-r *:p-2">
        <td>{session.teaching.division.batch.syllabus.degree.degree_name_acronym}</td>
        <td>{session.teaching.division.batch.year_started}</td>
        <td>{session.teaching.division.division_name}</td>
        <td><Link href={`courses/${session.teaching.course.course_id}`}>{session.teaching.course.course_name_acronym}</Link></td>
        <td>{session.type}</td>
        <td>{session.date.toLocaleDateString()}</td>
        <td>{session.time_start.getUTCHours()}:{session.time_start.getUTCMinutes()}</td>
        <td>{session.time_end.getUTCHours()}:{session.time_end.getUTCMinutes()}</td>
        <td>{session.room.floor.floor_number}0{session.room.room_number}</td>
        <td><Link href={`sessions/${session.session_id}/attendance`}>Attendance</Link></td>
      </tr>
    );
  });

  return (
    <div className="w-full p-2 space-y-2">
      <SessionCreate teaching={teaching} rooms={rooms} />
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr className="*:border-r">
            <th>Degree</th>
            <th>Batch</th>
            <th>Division</th>
            <th>Course</th>
            <th>Type</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Room Number</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody className="border *:border">
          {items}
        </tbody>
      </table>
    </div>
  );
}
