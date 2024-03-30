"use client";
import { CategoryScale, Chart } from "chart.js/auto";
import { Doughnut, Line, Pie } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function ChartComponent({ batchs, teaching }: any) {

  return (
    <div className="p-2 grid-cols-4 flex gap-4">
      <div>
        <Line data={{
          labels: batchs.map((b: any) => b.year_started),
          datasets: [
            {
              label: "Enrollment",
              data: batchs.map((b: any) => b._count.enrollment),
              borderColor: "rgb(100, 50, 255)",
            },
          ],
        }} />
      </div>
      <div>
        <Pie data={{
          labels: ["Lecture", "Timetable"],
          datasets: [
            {
              label: "Teaching",
              data: [teaching[0]._count.lecture, teaching[0]._count.timetable],
              borderColor: "rgb(100, 50, 255)",
            },
          ],
        }} />
      </div>
    </div>
  );
}
