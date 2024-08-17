import { createCourse } from "@/actions/course";

export default async function CourseCreate({ department_id }: { department_id: number }) {

  return (
    <form action={createCourse} className="bg-gray-200 w-full rounded-md p-2 grid grid-cols-6 gap-x-8 gap-y-2 items-center">
      <input type="number" name="department_id" value={department_id} required hidden />

      <label htmlFor="course_code">Course Code</label>
      <input type="text" name="course_code" required />
  
      <label htmlFor="course_name">Course Name</label>
      <input type="text" name="course_name" required />

      <label htmlFor="course_name_acronym">Course Name Acronym</label>
      <input type="text" name="course_name_acronym" required />

      <label htmlFor="course_type">Course Type</label>
      <select name="course_type" required>
        <option value="theory">Theory</option>
        <option value="practical">Practical</option>
      </select>

      <label htmlFor="year_created">Year Created</label>
      <input type="number" name="year_created" required />

      <button type="submit">
        <span className="material-symbols-outlined">add</span>
        New Course
      </button>
    </form>
  );
}
