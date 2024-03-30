// import SyllabusCreate from "@/components/syllabus/SyllabusCreate";
// import SyllabusList from "@/components/syllabus/SyllabusList";
import CourseCreate from "@/components/course/CourseCreate";
import CourseList from "@/components/course/CourseList";
import { prisma } from "@/lib/db";

export default async function Page({ params }: { params: any }) {
  // const syllabus = await prisma.syllabus.findMany({
  //   select: {
  //     syllabus_id: true,
  //     year_effective: true,
  //   },
  //   where: {
  //     degree_id: parseInt(params.degree_id),
  //   },
  // });
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
  // console.log(courses[0].syllabus_course[0].syllabus.year_effective);

  return (
    <div className="w-full h-full p-2 space-y-2 overflow-auto">
      {/* <SyllabusCreate degree_id={params.degree_id} /> */}
      {/* <SyllabusList degree_id={parseInt(params.degree_id)} syllabus={syllabus} /> */}
      <CourseCreate degree_id={params.degree_id} />
      <CourseList courses={courses} />
    </div>
  );
}
