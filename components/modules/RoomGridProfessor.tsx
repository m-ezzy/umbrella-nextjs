import { createAttendance, createOrUpdateAttendancePosition, updateAttendanceStatus, deleteAttendance } from "@/actions/attendance"
import Image from "next/image"

export default function RoomGridProfessor({ user_id, session_id, rowCount, columnCount, attendances }: any) {
  const deleteAttendanceForm: any = ({ row, column, attendance }: any) => (
    <form action={deleteAttendance}>
      <input type="hidden" name="session_id" value={session_id} hidden />
      <input type="hidden" name="user_id" value={attendance.user_id} hidden />
      <input type="hidden" name="position_row" value={row} hidden />
      <input type="hidden" name="position_column" value={column} hidden />
      <button type="submit">
        <Image src={attendance.user.profile_picture_url ? `/data/user/profile_pictures/${attendance.user.profile_picture_url}` : '/assets/images/default.jpeg'} width={200} height={200} alt="Profile Picture" className="w-full h-full" />
        {/* {attendance.user.name_first} {attendance.user.name_sur} */}
      </button>
    </form>
  )

  const cellItem: any = ({ row, column, attendance }: any) => {
    return (
      <div key={`${row}${column}`} className="w-16 h-16 bg-gray-300 rounded-md">
        {attendance ? deleteAttendanceForm({ row: row, column: column, attendance: attendance }) : <></>}
      </div>
    )
  }

  const cellItems = [];
  for (let i = 1; i <= rowCount; i++) {
    for (let j = 1; j <= columnCount; j++) {
      const attendance = attendances.find((item: any) => item.position_row == i && item.position_column == j);
      cellItems.push(cellItem({ row: i, column: j, attendance: attendance }));
    }
  }

  return (
    <div className="w-max border rounded-md mx-auto p-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${columnCount}, max-content)` }}>
      {cellItems}
    </div>
  )
}
