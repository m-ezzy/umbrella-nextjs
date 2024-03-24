import SyllabusCreate from "@/components/syllabus/SyllabusCreate"
import SyllabusList from "@/components/syllabus/SyllabusList"

export default async function Page({ params }: {params: { degree_id: number }}) {
  return (
    <div className="w-full p-2">
      <SyllabusCreate degree_id={params.degree_id} />
      <SyllabusList />
    </div>
  );
}
