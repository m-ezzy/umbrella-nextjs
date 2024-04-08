import { redirect } from "next/navigation"
import RoomGridStudent from "@/components/attendance/RoomGridStudent"
import { prisma } from "@/lib/db"
import { auth } from "@/auth"

export default async function Page({ params }: { params: { enrollment_id: string, semester: string, course_id: string, session_id: string } }) {
  const session: any = await auth()

  const sessionData = await prisma.session.findUniqueOrThrow({
    include: {
      room: true,
    },
    where: {
      session_id: parseInt(params.session_id),
    },
  })
  .catch((error) => {
    return null;
  })

  if(!sessionData) {
    redirect("/dashboard/views/tree/student")
  }

  if(sessionData.open_for_attendance == false) {
    return <h1>Attendance not open</h1>
  }

  const attendanceData: any = await prisma.session_attendance.findMany({
    include: {
      user: {
        select: {
          profile_picture_url: true,
        },
      },
    },
    where: {
      session_id: parseInt(params.session_id),
    },
  })

  return (
    <div>
      <h1>Select your approximate location in the room when faculty opens the attendance</h1>
      <RoomGridStudent user_id={session.user.user_id} session_id={sessionData.session_id} rowCount={sessionData.room.count_row} columnCount={sessionData.room.count_column} attendanceData={attendanceData} />
    </div>
  )
}
