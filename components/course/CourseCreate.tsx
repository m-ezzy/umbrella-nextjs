import { createCourse } from "@/actions/course";
import { selectByDegreeId } from "@/models/Syllabus";

export default async function CourseCreate({ degree_id }: { degree_id: number }) {
  let syllabus = await selectByDegreeId(degree_id);

  let syllabusItems = syllabus.map((s:any) => {
    return <option key={s.id} value={s.id}>{s.year_effective}</option>;
  });

  return (
    <div>
      <form action={createCourse} className="w-full border rounded-md p-2 grid grid-cols-6 gap-x-8 gap-y-2 items-center">
        <label htmlFor="course_code">Course Code</label>
        <input type="text" name="course_code" placeholder="Course Code" />
  
        <label htmlFor="course_name">Course Name</label>
        <input type="text" name="course_name" placeholder="Course Name" />

        <label htmlFor="course_name_acronym">Course Name Acronym</label>
        <input type="text" name="course_name_acronym" placeholder="Course Name Acronym" />

        <label htmlFor="course_type">Course Type</label>
        <select name="course_type">
          {/* <option value="">Select Type</option> */}
          <option value="theory">Theory</option>
          <option value="practical">Practical</option>
        </select>

        <label htmlFor="year_created">Year Created</label>
        <input type="number" name="year_created" placeholder="Year Created" />

        <label htmlFor="course_category">Course Category</label>
        <select name="course_category">
          <option value="">Select Category</option>
          <option value="core">Core</option>
          <option value="elective">Elective</option>
          <option value="project">Project</option>
          <option value="MOOC">MOOC</option>
          <option value="foundation">Foundation</option>
        </select>

        <label htmlFor="course_credits">Course Credits</label>
        <input type="number" name="course_credits" placeholder="Course Credits" />

        <label htmlFor="course_semester">Course Semester</label>
        <input type="number" name="course_semester" placeholder="Course Semester" />

        <label htmlFor="syllabus_id">Syllabus</label>
        <select name="syllabus_id">
          <option value="">Select Syllabus</option>
          {syllabusItems}
        </select>

        <button type="submit">
          <span className="material-symbols-outlined">add</span>
          New Course
        </button>
      </form>
    </div>
  );
}
