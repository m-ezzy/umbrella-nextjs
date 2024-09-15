"use client";
import { CategoryScale, Chart } from "chart.js/auto";
import { Doughnut, Line, Pie } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function Charts({ batchs, enrollments, teaching }: any) {
  return <></>
  
  return (
    <div className="grid-cols-4 flex gap-2">
      <div className="border p-2">
        <Line data={{
          labels: batchs.map((b: any) => b.year_started),
          datasets: [
            {
              label: "Enrollment",
              data: batchs.map((b: any) => b._count.enrollments),
              borderColor: "rgb(100, 50, 255)",
            },
          ],
        }} />
      </div>
      <div className="border p-2">
        <Pie data={{
          labels: ["Male", "Female"],
          datasets: [
            {
              label: "Male",
              data: [enrollments.map((e: any) => e.user.gender).filter((g: string) => g === "M").length, enrollments.map((e: any) => e.user.gender).filter((g: string) => g === "F").length],
              backgroundColor: ["rgb(100, 50, 255)", "rgb(255, 50, 150)"],
            },
          ],
        }} />
      </div>
      <div className="border p-2">
        <Pie data={{
          labels: ["Session", "Timetable"],
          datasets: [
            {
              label: "Teaching",
              data: [teaching[0]._count.sessions, teaching[0]._count.timetables],
              borderColor: "rgb(100, 50, 255)",
            },
          ],
        }} />
      </div>
    </div>
  );
}
