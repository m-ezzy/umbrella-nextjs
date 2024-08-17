import Link from "next/link";
import { prisma } from "@/lib/db";
import SessionCreateSimple from "@/components/modules/session/SessionCreateSimple";

export default async function Layout({ params, children }: any) {
  const data = await prisma.session.findMany({
    include: {
      room: {
        include: {
          floor: true,
        },
      },
    },
    where: {
      teaching_id: parseInt(params.teaching_id),
    },
  });
  
  const items = data.map((item: any) => {
    return(
      <li key={item.session_id} className="border-b p-2 grid grid-cols-5">
        <div>{item.date.toLocaleDateString()}</div>
        <div>{item.time_start.getUTCHours()}:{item.time_start.getUTCMinutes()}</div>
        <div>{item.time_end.getUTCHours()}:{item.time_end.getUTCMinutes()}</div>
        <div>{item.room.floor.floor_number}0{item.room.room_number}</div>
        <Link href={`/dashboard/views/waterfall/professor/${params.department_id}/courses/${params.course_id}/teaching/${params.teaching_id}/sessions/${item.session_id}/attendance`}>
          Take Attendance
        </Link>
      </li>
    );
  });

  return (
    <>
      <SessionCreateSimple teaching_id={params.teaching_id} />
      <div className="overflow-auto p-2">
        <div className="bg-gray-200 rounded-md p-2 grid grid-cols-5">
          <div>Date</div>
          <div>Start Time</div>
          <div>End Time</div>
          <div>Venue</div>
          <div>Take Attendance</div>
        </div>
        <ul>
          {items}
        </ul>
      </div>
      {children}
    </>
  );
}
