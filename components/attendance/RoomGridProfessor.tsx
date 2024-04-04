import { createAttendance, createOrUpdateAttendancePosition, updateAttendanceStatus, deleteAttendance } from "@/actions/attendance"
import Image from "next/image";

export default function RoomGridProfessor({ user_id, session_id, rowCount, columnCount, attendances }: any) {
  const cellItem: any = ({ row, column, attendance }: any) => {
    return (
      <div key={`${row}${column}`}>
        <form action={deleteAttendance}>
          <input type="hidden" name="session_id" value={session_id} hidden />
          {/* <input type="hidden" name="user_id" value={user_id} hidden /> */}
          <input type="hidden" name="position_row" value={row} hidden />
          <input type="hidden" name="position_column" value={column} hidden />
          <button type="submit" className={`bg-gray-200 w-16 h-16`}>
            <Image src={`/data/user/profile_pictures/${attendance ? attendance.user.profile_picture_url : 'default.png'}`} width={100} height={100} alt="Profile Picture" />
            {`${attendance ? attendance.user.name_first : ''}`}
          </button>
        </form>
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
    <div className="p-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${columnCount}, auto)` }}>
      {cellItems}
    </div>
  );
}
