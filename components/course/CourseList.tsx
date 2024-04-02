import Link from "next/link";
import { updateCourse, deleteCourse } from "@/actions/course";

export default async function CourseList({ courses }: { courses: any }) {
  const items = courses.map((item: any) => (
    <li key={item.course_id} className="border-b p-2 grid grid-cols-7">
      <div>{item.course_code}</div>
      <div>{item.course_name}</div>
      <div>{item.course_name_acronym}</div>
      <div>{item.course_type}</div>
      <div>{item.year_created}</div>
      
      <div>
        {/* <form action={updateCourse}>
          <input type="hidden" name="course_id" value={item.course_id} hidden />
          <button type="submit">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </form> */}
      </div>
      <div>
        <form action={deleteCourse}>
          <input type="hidden" name="course_id" value={item.course_id} hidden />
          <button type="submit">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </form>
      </div>
    </li>
  ));
  return (
    <div className="overflow-auto relative">
      <div className="bg-gray-200 rounded p-2 grid grid-cols-7 sticky top-0">
        <div>Code</div>
        <div>Name</div>
        <div>Name Acronym</div>
        <div>Type</div>
        <div>Year Created</div>
        <div>Edit</div>
        <div>Delete</div>
      </div>
      <ul className="flex-col gap-2">
        {items}
      </ul>
    </div>
  )
}
