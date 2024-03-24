import { createSyllabus } from "@/actions/syllabus";
import { selectByDegreeId } from "@/models/Syllabus";

export default async function CourseCreate({ degree_id }: { degree_id: number }) {
  let syllabus = await selectByDegreeId(degree_id);

  let syllabusItems = syllabus.map((s:any) => {
    return <option key={s.id} value={s.id}>{s.year_effective}</option>;
  });

  return (
    <div>
      <form action={createCourse} className="w-full border rounded-md p-2 grid grid-cols-4 gap-2">
        <input type="text" name="name_full" placeholder="Course Full Name" />
        <input type="text" name="name_acronym" placeholder="Course Short Name" />
        <input type="text" name="code" placeholder="Course Code" />
        <input type="text" name="credit" placeholder="Course Credit" />
        <select name="type">
          <option value="">Select Type</option>
          <option value="theory">Theory</option>
          <option value="practical">Practical</option>
        </select>
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
