"use client";
import { CategoryScale, Chart } from "chart.js/auto";
import { Line, Pie, Scatter } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function ChartComponent({ session_attendance }: any) {
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
      
      <div className="border">
      </div>
    </div>
  );
}
