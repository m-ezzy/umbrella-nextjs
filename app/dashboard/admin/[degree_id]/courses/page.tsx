import SyllabusCreate from "@/components/syllabus/SyllabusCreate";
import CourseCreate from "@/components/course/CourseCreate";
import CourseList from "@/components/course/CourseList";
import { prisma } from "@/lib/db";

export default async function Page({ params }: { params: any }) {
  const courses = await prisma.course.findMany({
    select: {
      course_id: true,
      course_code: true,
      course_name: true,
      course_name_acronym: true,
      course_type: true,
      year_created: true,
      syllabus_course: {
        select: {
          syllabus: {
            select: {
              syllabus_id: true,
              year_effective: true,
            },
          },
        },
      },
    },
    where: {
      syllabus_course: {
        some: {
          syllabus: {
            degree_id: parseInt(params.degree_id),
          },
        },
      },
    },
  });
  console.log(courses[0].syllabus_course[0].syllabus.year_effective);

  return (
    <div className="w-full p-2">
      <SyllabusCreate degree_id={params.degree_id} />
      <CourseCreate degree_id={params.degree_id} />
      <CourseList courses={courses} />
    </div>
  );
}
