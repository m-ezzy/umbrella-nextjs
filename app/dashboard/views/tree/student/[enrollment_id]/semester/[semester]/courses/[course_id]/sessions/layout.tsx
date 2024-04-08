import Link from "next/link"
import { prisma } from "@/lib/db"
import { auth } from "@/auth"

export default async function Layout({ params, children }: any) {
  const session: any = await auth()

  const data = await prisma.session.findMany({
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
      attendances: {
        where: {
          user_id: session.user.user_id,
        },
      },
    },
    where: {
      teaching: {
        course: {
          course_id: parseInt(params.course_id),
        },
        division: {
          enrollments: {
            some: {
              enrollment_id: parseInt(params.enrollment_id),
            },
          },
        },
      },
    },
  });
  
  const items = data.map((item: any) => {
    // Format hours and minutes to have leading zeros if necessary
    // hours = (hours < 10 ? '0' : '') + hours;
    // minutes = (minutes < 10 ? '0' : '') + minutes;

    // also put zero(0) dynamically in room number

    const status = item.attendances.length ? (item.attendances[0].status ? item.attendances[0].status : "pending verification") : "absent"
    const className = item.attendances.length ? (item.attendances[0].status == "present" ? "bg-green-200" : "bg-yellow-200") : "bg-red-200"

    return(
      <li key={item.session_id} className="border-b p-2">
        <div>{item.teaching.professor.name_prefix} {item.teaching.professor.name_first} {item.teaching.professor.name_sur}</div>
        <div>{item.date.toLocaleDateString()}</div>
        <div>{item.time_start.getUTCHours()}:{item.time_start.getUTCMinutes()}</div>
        <div>{item.time_end.getUTCHours()}:{item.time_end.getUTCMinutes()}</div>
        <div>{item.room.floor.floor_number}0{item.room.room_number}</div>
        <div className={className}>{status}</div>
        <Link href={`/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/sessions/${item.session_id}/attendance`}>
          Give Attendance
        </Link>
      </li>
    );
  });

  return (
    <div className="bg-white w-full h-full p-2 flex">
      <div className="overflow-auto">
        <div className="bg-gray-200 rounded p-2">
          <div>Professor</div>
          <div>Date</div>
          <div>Start Time</div>
          <div>End Time</div>
          <div>Venue</div>
          <div>Attendance Status</div>
        </div>
        <ul>
          {items}
        </ul>
      </div>
      <div className="bg-zinc-400 w-full h-full flex">
        {children}
      </div>
    </div>
  );
}
