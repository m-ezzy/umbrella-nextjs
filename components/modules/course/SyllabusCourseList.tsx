import Link from "next/link";
import { deleteSyllabusCourse } from "@/actions/syllabus_course";

export default async function SyllabusCourseList({ syllabus_id, syllabus_courses }: any) {
  const items = syllabus_courses.map((item: any) => (
    <li key={item.course_id} className="border-b p-2 grid grid-cols-10">
      <div>{item.code}</div>
      <div>{item.course.course_name}</div>
      <div>{item.course.course_name_acronym}</div>
      <div>{item.course.course_type}</div>
      <div>{item.course.year_created}</div>

      <div>{item.course_category}</div>
      <div>{item.course_credits}</div>
      <div>{item.course_semester}</div>

      <div>
        <form action={deleteSyllabusCourse}>
          <input type="hidden" name="syllabus_id" value={syllabus_id} hidden readOnly />
          <input type="hidden" name="course_id" value={item.course_id} hidden readOnly />
          <button type="submit">
            <span className="material-symbols-outlined">delete</span>
            remove
          </button>
        </form>
      </div>
    </li>
  ));
  return (
    <div className="overflow-auto relative">
      <div className="bg-gray-200 rounded p-2 grid grid-cols-10">
        <div>Code</div>
        <div>Name</div>
        <div>Name Acronym</div>
        <div>Type</div>
        <div>Year Created</div>

        <div>Category</div>
        <div>Credits</div>
        <div>Semester</div>

        <div>Delete</div>
      </div>
      <ul className="flex-col gap-2">
        {items}
      </ul>
    </div>
  )
}
