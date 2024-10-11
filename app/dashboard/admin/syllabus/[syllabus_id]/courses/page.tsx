import prisma from "@/lib/prisma";
import { createCourse, deleteCourse } from "@/actions/course";
import ListTable from "@/components/ui/advanced/ListTable";
import DeleteForm from "@/components/ui/advanced/DeleteForm";

export default async function Page({ params }: any) {
  const result: any = await prisma.course.findMany({
    where: {
      syllabus_id: Number(params.syllabus_id),
    },
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }));

  console.log(result);

  let dataset: any[] = result.data.map((course: any) => {
    return {
      "id": course.id,
      "Code": course.code,
      "Semester": course.semester,
      "Delete": <DeleteForm objectName="Course" id={course.id} serverAction={deleteCourse} />,
    };
  });
  return (
    <div className="w-full p-2 space-y-2">
      {/* <CreateForm objectName="Syllabus" fields={fields} serverAction={createCourse} /> */}
      <ListTable data={dataset} />
    </div>
  );
}
