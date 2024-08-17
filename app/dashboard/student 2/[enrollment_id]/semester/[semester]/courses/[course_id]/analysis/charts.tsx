"use client"
import { CategoryScale, Chart } from "chart.js/auto"
import { Line, Pie, Scatter } from "react-chartjs-2"

Chart.register(CategoryScale)

export default function ChartComponent({ session_attendance }: any) {
  // console.log(session_attendance)

  return (
    <div className="p-2 flex gap-2">
      <div className="border">
        <Pie
          data={{
            labels: ["Present", "Absent", "Leave"],
            datasets: [
              {
                label: "Attendance",
                data: [
                  session_attendance.filter((item: any) => item.attendances[0] ? (item.attendances[0].status === "present") : false).length,
                  session_attendance.filter((item: any) => item.attendances[0] ? (item.attendances[0].status === "absent") : true).length,
                  session_attendance.filter((item: any) => item.attendances[0] ? (item.attendances[0].status === "leave") : false).length,
                ],
                backgroundColor: ["lightgreen", "red", "yellow"],
              },
            ],
          }}
        />
      </div>
    </div>
  )
}
