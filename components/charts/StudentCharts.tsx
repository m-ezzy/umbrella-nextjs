"use client";
import { CategoryScale, Chart } from "chart.js/auto";
import { Line, Pie, Scatter } from "react-chartjs-2";

Chart.register(CategoryScale);

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

// marks metrics

// assignments completed vs pending
