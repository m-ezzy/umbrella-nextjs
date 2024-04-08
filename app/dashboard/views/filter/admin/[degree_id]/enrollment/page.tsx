import Link from "next/link";
import EnrollmentFilter from "@/components/enrollment/EnrollmentFilter";
import EnrollmentList from "@/components/enrollment/EnrollmentList";
import { prisma } from "@/lib/db";

export default async function Page({ params }: {params: { degree_id: string }}) {
  const batchs = await prisma.batch.findMany({
    where: {
      syllabus: {
        degree: {
          degree_id: parseInt(params.degree_id),
        },
      },
    },
  })

  const enrollments = await prisma.enrollment.findMany({
    include: {
      division: {
        include: {
          batch: true,
        },
      },
      user: true,
    },
    where: {
      division: {
        batch: {
          syllabus: {
            degree: {
              degree_id: parseInt(params.degree_id),
            },
          },
        },
      },
    },
  })

  // console.log(enrollments)

  return (
    <div className="w-full p-2 space-y-2 overflow-auto">
      <EnrollmentFilter batchs={batchs} enrollments={enrollments} />
      <EnrollmentList enrollments={enrollments} />
    </div>
  );
}
