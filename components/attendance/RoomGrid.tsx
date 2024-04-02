import { useState } from "react";
import GridCell from "@/components/attendance/GridCell";

function gridRow(columnCount: number) {
}

export default function RoomGrid({ rowCount, columnCount, sessionData, attendanceData }: any) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const grid = [];
  for (let i = 1; i <= rowCount; i++) {
    const row = [];
    for (let j = 1; j <= columnCount; j++) {
      row.push(<GridCell key={j} rowNum={i} colNum={j} selected={selectedRow === i && selectedColumn === j} />)
    }
    grid.push(
      <div key={i} className="flex">
        {row}
      </div>
    );
  }

  return (
    <div>
      <h2>Select Room</h2>
      <div className="grid grid-cols-5 gap-2">{grid}</div>
      <button
        onClick={() => {
          console.log(selectedRoom);
        }
        }
      >
        Submit
      </button>
    </div>
  );
}
