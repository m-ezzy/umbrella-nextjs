import Link from "next/link";
import EnrollmentFilter from "@/components/enrollment/EnrollmentFilter";
import EnrollmentList from "@/components/enrollment/EnrollmentList";
import { prisma } from "@/lib/db";

export default async function Page({ params }: {params: { degree_id: string }}) {
  const enrollments = await prisma.enrollment.findMany({
    include: {
      batch: {
        include: {
          syllabus: {
            include: {
              degree: true,
            },
          }
        },
      },
      division: true,
      user: true,
    },
    where: {
      batch: {
        syllabus: {
          degree: {
            degree_id: parseInt(params.degree_id),
          },
        },
      },
    },
  });
  return (
    <div className="w-full p-2 space-y-2 overflow-auto">
      <EnrollmentFilter enrollments={enrollments} />
      <EnrollmentList enrollments={enrollments} />
    </div>
  );
}
