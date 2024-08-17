import Image from 'next/image'
import { createOrUpdateAttendancePosition } from "@/actions/attendance"

export default function RoomGridStudent({ user_id, session_id, rowCount, columnCount, attendanceData }: any) {
  // which pattern is right
  // 1. passing the data to the component and then rendering it - here we get the benefit of showing rendering UI through loading.tsx file
  // 2. fetching the data inside the component and then rendering it - here we get the benefit of

  // also show other students' locations

  // a student will be able to select only the empty position or unselect his own position and not alter other's position

  const cellItem: any = ({ row, column }: any) => {
    const selected = attendanceData.find((data: any) => data.user_id == user_id && data.position_row == row && data.position_column == column)
    const selectedByMe = selected && selected.user_id == user_id

    return (
      <div key={`${row}${column}`}>
        <form action={createOrUpdateAttendancePosition}>
          <input type="hidden" name="session_id" value={session_id} hidden />
          <input type="hidden" name="position_row" value={row} hidden />
          <input type="hidden" name="position_column" value={column} hidden />
          <button type="submit" className={`bg-gray-200 w-16 h-16 ${selected ? 'bg-green-400' : ''}`}>
            {selectedByMe ? 
              <span className="bg-green-400 w-full h-full"></span>
              :
              (selected ? <Image src={`/data/user/profile_pictures/${attendanceData.user.profile_picture_url}`} width={200} height={200} alt="Profile Picture" className="w-full h-full" /> : <></>)
            }
          </button>
        </form>
      </div>
    )
  }
  const cellItems = [];
  for (let i = 1; i <= rowCount; i++) {
    for (let j = 1; j <= columnCount; j++) {
      cellItems.push( cellItem({ row: i, column: j }) );
    }
  }
  return (
    <div className="w-max border rounded-md p-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${columnCount}, max-content)` }}>
      {cellItems}
    </div>
  );
}
