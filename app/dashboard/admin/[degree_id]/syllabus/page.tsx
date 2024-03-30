import SyllabusCreate from "@/components/syllabus/SyllabusCreate"
import SyllabusList from "@/components/syllabus/SyllabusList"
import { prisma } from "@/lib/db"

export default async function Page({ params }: {params: { degree_id: string }}) {
  const syllabus = await prisma.syllabus.findMany({
    select: {
      syllabus_id: true,
      year_effective: true,
    },
    where: {
      degree_id: parseInt(params.degree_id),
    },
  });
  return (
    <div className="w-full p-2">
      <SyllabusCreate degree_id={parseInt(params.degree_id)} />
      <SyllabusList degree_id={parseInt(params.degree_id)} syllabus={syllabus} />
    </div>
  );
}
