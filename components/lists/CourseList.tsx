import Link from "next/link"
import useSWR from "swr"
import { course } from "@prisma/client"
import { updateCourse, deleteCourse } from "@/actions/course"
import ListTable from "@/components/ui/advanced/ListTable"
import DeleteForm from "@/components/ui/advanced/DeleteForm"

export default async function CourseList({
  courses,
  syllabus_id,
}: {
  courses: course[],
  syllabus_id: number,
}) {
  // const coursesAll: any = await prisma.course.findMany({
  //   where: {
  //     semester: { in: semester },
  //     syllabus: {
  //       degree: {
  //         AND: [
  //           // { department: { university: university }, },
  //           // { department: department },
  //         ],
  //       },
  //     },
  //     AND: [
  //       // { semester: filters.semester },
  //       // { category: filters.category },
  //       // { type: filters.type },
  //     ],
  //   },
  // })
  // { key: 'description', title: 'Description', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/description`, icon: '📚' }, // code, type, category, credits, books, chapters, objectives, outcome, ...
  // { key: 'content', title: 'Content', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/content`, icon: '📚' },

  let { isLoading, error, data } = useSWR("/api/courses")

  let dataset: any = data.map((course: any) => {
    return {
      id: course.id,
      Name: course.name,
      "Name Short": course.name_short,
      Category: course.category,
      Type: course.type,
      Semester: course.semester,
      Credits: course.credits,
      Divisions: <Link href={`courses/${course.id}/divisions`}>Divisions</Link>,
      Teaching: <Link href={`courses/${course.id}/teaching`}>Teaching</Link>,
      Edit: <Link href={`courses/${course.id}/edit`}>Edit</Link>,
      Delete: <DeleteForm action={deleteCourse} id={course.id} />,
    }
  })
  return <ListTable data={dataset} />
}
