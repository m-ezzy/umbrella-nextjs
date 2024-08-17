// import { useRef } from "react";
import Link from "next/link";
import { Chart } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Charts from "./charts";
import { prisma } from "@/lib/db";

export default async function Page({ params }: {params: { degree_id: string }}) {
  // const canvasRef: any = useRef<HTMLCanvasElement>(null);

  const batchs = await prisma.batch.findMany({
    select: {
      _count: {
        select: {
          enrollments: true
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
  })

  const enrollments = await prisma.enrollment.findMany({
    include: {
      user: true,
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
  })
  
  const teaching = await prisma.teaching.findMany({
    select: {
      _count: {
        select: {
          sessions: true,
          timetables: true,
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
  })

  const professor_sessions = await prisma

  return (
    <div className="w-full p-2 overflow-auto">
      <Charts batchs={batchs} enrollments={enrollments} teaching={teaching} />
    </div>
  );
}
