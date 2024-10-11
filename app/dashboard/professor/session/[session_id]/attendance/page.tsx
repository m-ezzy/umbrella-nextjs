import { redirect } from "next/navigation"
import SessionUpdateButton from "@/components/modules/SessionAttendanceStatusUpdateButton"
import AttendanceVerifyButton from "@/components/modules/AttendanceVerifyButton"
import RoomGridProfessor from "@/components/modules/RoomGridProfessor"
import AttendanceList from "../../../../../../components/lists/AttendanceListProfessor"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

export default async function Page({ params }: any) {
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

  // if session is not found, redirect to previous page
  if(!sessionData) {
    redirect("/dashboard")
  }

  const attendances = await prisma.session_attendance.findMany({
    include: {
      user: true,
    },
    where: {
      session_id: parseInt(params.session_id),
    },
  })
  .catch((error) => {
    return null
  })

  return (
    <div className="w-full overflow-auto p-2 space-y-2">
      <div className="w-full flex justify-end gap-2">
        <SessionUpdateButton session_id={params.session_id} open_for_attendance={sessionData.open_for_attendance} />
        <AttendanceVerifyButton session_id={params.session_id} />
      </div>
      <RoomGridProfessor user_id={session.user.id} session_id={params.session_id} rowCount={sessionData.room.count_row} columnCount={sessionData.room.count_column} attendances={attendances} />
      <AttendanceList session_id={params.session_id} data={attendances} />
    </div>
  )
}

export const revalidate = 10
