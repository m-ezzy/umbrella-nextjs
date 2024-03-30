import Link from "next/link";
import BatchCreate from "@/components/batch/BatchCreate";
import DivisionCreate from "@/components/division/DivisionCreate";
import BatchList from "@/components/batch/BatchList";
import { prisma } from "@/lib/db";

export default async function Page({ params }: {params: { degree_id: number }}) {
  const batchs = await prisma.batch.findMany({
    select: {
      _count: {
        select: {
          enrollment: true
        }
      },
      batch_id: true,
      year_started: true,
      year_ended: true,
      syllabus: {
        select: {
          syllabus_id: true,
          duration_years: true,
          duration_semesters: true,
          year_effective: true,
          year_retired: true,
          degree_id: true,
        }
      },
      division: {
        select: {
          _count: {
            select: {
              enrollment: true
            }
          },
          division_id: true,
          division_name: true,
        }
      },
    },
    where: {
      syllabus: {
        degree_id: Number(params.degree_id),
      }
    },
    orderBy: {
      year_started: 'asc'
    }
  });

  const syllabus = await prisma.syllabus.findMany({
    select: {
      syllabus_id: true,
      duration_years: true,
      duration_semesters: true,
      year_effective: true,
      year_retired: true,
      degree_id: true,
    },
    where: {
      degree_id: Number(params.degree_id),
    }
  });
  return (
    <div className="w-full h-full p-2 space-y-2 overflow-auto">
      <BatchCreate syllabus={syllabus} degree_id={params.degree_id} />
      <DivisionCreate batchs={batchs} />
      <BatchList degree_id={params.degree_id} batchs={batchs} syllabus={syllabus} />
    </div>
  );
}
