import CourseCreate from "@/components/course/CourseCreate";

export default async function Page({ params }: {params: { degree_id: number }}) {
  return (
    <div className="w-full p-2">
      <CourseCreate degree_id={params.degree_id} />
      {/* <CourseList /> */}
    </div>
  );
}
