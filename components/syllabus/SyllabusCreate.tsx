import { createSyllabus } from "@/actions/syllabus";

export default async function SyllabusCreate({ degree_id }: { degree_id: number }) {

  return (
    <div>
      <form action={createSyllabus} className="w-full border rounded-md p-2 grid grid-cols-5 gap-2 items-center">
        <input type="text" name="degree_id" value={degree_id} hidden />

        {/* <label htmlFor="year_effective">Year Effective</label> */}
        <input type="text" name="year_effective" placeholder="Year Effective" required />

        {/* <label htmlFor="syllabus_code">Syllabus Code</label> */}
        <input type="text" name="syllabus_code" placeholder="Syllabus Code" />

        {/* <label htmlFor="duration_years">Duration in years</label> */}
        <input type="text" name="duration_years" placeholder="Duration in years" required />

        {/* <label htmlFor="duration_semesters">Duration in semesters</label> */}
        <input type="text" name="duration_semesters" placeholder="Duration in semesters" required />

        <button type="submit">
          <span className="material-symbols-outlined">add</span>
          New Syllabus
        </button>
      </form>
    </div>
  );
}
