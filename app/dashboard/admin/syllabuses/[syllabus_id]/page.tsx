import { redirect } from "next/navigation";
import SyllabusCourseCreate from "@/components/modules/syllabus_course/SyllabusCourseCreate"
import SyllabusCourseList from "@/components/modules/course/SyllabusCourseList"
import { prisma } from "@/lib/db"

export default async function Page({ params }: { params: { degree_id: string, syllabus_id: string } }) {
  let syllabus = await prisma.syllabus.findUnique({
    where: {
      syllabus_id: Number(params.syllabus_id),
      degree_id: Number(params.degree_id),
    },
  });

  if(!syllabus) redirect(`/dashboard/admin/${params.degree_id}/syllabus`);

  let courses2 = await prisma.department.findFirstOrThrow({
    where: {
      degree: {
        some: {
          degree_id: Number(params.degree_id),
        },
      },
    },
  }).courses();
  // console.log(courses2);

  const courses: any = await prisma.course.findMany({
    where: {
      department: {
        degree: {
          some: {
            degree_id: Number(params.degree_id)
          },
        },
      },
      // department_id: Number(params.degree_id)
    },
  });
  // console.log(courses);

  const syllabus_courses = await prisma.syllabus_course.findMany({
    include: {
      course: true,
    },
    where: {
      syllabus_id: Number(params.syllabus_id),
    },
  });
  // console.log(syllabus_courses);

  return (
    <div className="w-full h-full p-2 space-y-2">
      <SyllabusCourseCreate syllabus_id={params.syllabus_id} courses={courses} />
      <SyllabusCourseList syllabus_id={params.syllabus_id} syllabus_courses={syllabus_courses} />
    </div>
  );
}
