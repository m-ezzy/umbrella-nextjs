import { createOrUpdateAttendancePosition } from "@/actions/attendance"

export default function RoomGridStudent({ user_id, session_id, rowCount, columnCount, attendanceData }: any) {
  // also show other students' locations

  const cellItem: any = ({ row, column, selected }: any) => {
    return (
      <div key={`${row}${column}`}>
        <form action={createOrUpdateAttendancePosition}>
          <input type="hidden" name="session_id" value={session_id} hidden />
          <input type="hidden" name="position_row" value={row} hidden />
          <input type="hidden" name="position_column" value={column} hidden />
          <input type="submit" className={`bg-gray-200 w-12 h-12 ${selected ? 'bg-violet-600' : ''}`} value={`${row},${column}`} />
        </form>
      </div>
    )
  }
  const cellItems = [];
  for (let i = 1; i <= rowCount; i++) {
    for (let j = 1; j <= columnCount; j++) {
      cellItems.push(cellItem({ row: i, column: j, selected: (attendanceData?.position_row == i && attendanceData?.position_column == j) }));
    }
  }
  return (
    <div className="p-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${columnCount}, auto)` }}>
      {cellItems}
    </div>
  );
}
