import { redirect } from "next/navigation"
import RoomGridProfessor from "@/components/attendance/RoomGridProfessor"
import { prisma } from "@/lib/db"
import { auth } from "@/auth"

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

  const attendances = await prisma.session_attendance.findMany({
    include: {
      user: true,
    },
    where: {
      session_id: parseInt(params.session_id),
    },
  })
  .catch((error) => {
    return null;
  })

  return (
    <div className="overflow-auto">
      <RoomGridProfessor user_id={session.user.user_id} session_id={params.session_id} rowCount={sessionData.room.count_row} columnCount={sessionData.room.count_column} attendances={attendances} />
    </div>
  )
}
