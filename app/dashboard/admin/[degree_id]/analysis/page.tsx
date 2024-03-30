// import { useRef } from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Chart } from "chart.js";
import ChartComponent from "./chart";
import { Doughnut } from "react-chartjs-2";

export default async function Page({ params }: {params: { degree_id: string }}) {
  // const canvasRef: any = useRef<HTMLCanvasElement>(null);

  const batchs = await prisma.batch.findMany({
    select: {
      _count: {
        select: {
          enrollment: true
        }
      },
      batch_id: true,
      year_started: true,
    },
    where: {
      syllabus: {
        degree_id: parseInt(params.degree_id),
      },
    },
  });
  const teaching = await prisma.teaching.findMany({
    select: {
      _count: {
        select: {
          lecture: true,
          timetable: true,
        }
      },
      teaching_id: true,
    },
    where: {
      division: {
        batch: {
          syllabus: {
            degree_id: parseInt(params.degree_id),
          },
        },
      },
    },
  });
  return (
    <div className="w-full p-2 overflow-auto">
      <ChartComponent batchs={batchs} teaching={teaching} />
    </div>
  );
}
