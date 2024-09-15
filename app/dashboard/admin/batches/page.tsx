import Link from "next/link"
import BatchCreate from "@/components/modules/batch/BatchCreate"
import DivisionCreate from "@/components/modules/division/DivisionCreate"
import BatchList from "@/components/modules/batch/BatchList"
import { prisma } from "@/lib/db"

export default async function Page() {
  // const { filters } = useAdminContext();

  const batchesOfSelectedFilters: any = await prisma.batch.findMany({})

  const batches = await prisma.batch.findMany({
    select: {
      _count: {
        select: {
          enrollments: true
        }
      },
      id: true,
      start_year: true,
      finish_year: true,
      syllabus_id: true,
      divisions: {
        select: {
          _count: {
            select: {
              enrollments: true,
            }
          },
          id: true,
          name: true,
        }
      },
    },
    where: {
    },
    orderBy: {
      start_year: 'asc'
    }
  });
  const syllabus = await prisma.syllabus.findMany({
    select: {
      id: true,
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
