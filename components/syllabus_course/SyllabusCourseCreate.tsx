"use client";
import { useFormState } from "react-dom";
import { createSyllabusCourse } from "@/actions/syllabus_course";

export default function SyllabusCourseCreate({ syllabus_id, courses }: any) {
  const [formState, dispatch] = useFormState(createSyllabusCourse, null);

  let courseItems = courses.map((course: any) => {
    return <option key={course.course_id} value={course.course_id}>{course.course_name}</option>;
  });

  return (
    <div className="space-y-2">
      <form action={dispatch} className="bg-gray-200 w-full rounded-md p-2 grid grid-cols-6 gap-2 items-center">
        <input type="number" name="syllabus_id" defaultValue={syllabus_id} required readOnly hidden />

        <label htmlFor="code">Syllabus Course Code</label>
        <input type="text" name="code" required />

        <label htmlFor="course_id">Course</label>
        <select name="course_id">
          {courseItems}
        </select>

        <label htmlFor="course_category">Course Category</label>
        <select name="course_category" required>
          <option value="core">Core</option>
          <option value="elective">Elective</option>
          <option value="project">Project</option>
          <option value="MOOC">MOOC</option>
          <option value="foundation">Foundation</option>
        </select>

        <label htmlFor="course_credits">Course Credits</label>
        <input type="number" name="course_credits" required />

        <label htmlFor="course_semester">Course Semester</label>
        <input type="number" name="course_semester" required />

        <button type="submit">
          <span className="material-symbols-outlined">add</span>
          New Syllabus Course
        </button>
      </form>

      {formState?.error && <div className="bg-red-300 rounded-md p-2">{formState.error}</div>}
    </div>
  );
}
