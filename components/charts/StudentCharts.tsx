"use client"

import { CategoryScale, Chart } from "chart.js/auto"
import { Bar, Bubble, Chart as ReactChart, ChartProps, Doughnut, Line, Pie, PolarArea, Radar, Scatter } from "react-chartjs-2"

Chart.register(CategoryScale)

// attendance metrics
export function AttendanceMetrics({ session_attendance }: any) {
  return (
    <div className="border size-1/6">
      <Pie
        // title="Attendance"
        data={{
          labels: ["Present", "Absent", "Leave"],
          datasets: [
            {
              label: "Attendance",
              data: [
                session_attendance.filter((item: any) => item.status === "present").length,
                session_attendance.filter((item: any) => item.status === "absent").length,
                session_attendance.filter((item: any) => item.status === "leave").length,
              ],
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
            },
          ],
        }}
      />
    </div>
  );
}

// assignments completed vs pending

// exam marks performance
export function ExamMarksMetrics({ exam_marks, course_id }: any) {
  return (
    <div className="border">
      <Bar
        data={{
          labels: exam_marks.map((item: any) => item.student_id),
          datasets: [
            {
              label: "Marks",
              data: exam_marks.map((item: any) => item.marks),
              backgroundColor: "#3e95cd",
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  )
}
