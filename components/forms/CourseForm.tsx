import { course, course_type, course_category } from "@prisma/client"
import { createCourse } from "@/actions/course"
import CreateForm from "../ui/advanced/CreateForm"

export default function CourseForm({
  mode,
  data,
  syllabus_id,
}: {
  mode: string,
  data: any,
  syllabus_id: number,
}) {
  let fields: any = [
    {
      type: 'hidden',
      name: 'id',
      defaultValue: data ? data.id : '',
    },
    {
      type: 'text',
      label: 'Code',
      name: 'code',
      defaultValue: data ? data.name : '',
    },
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      defaultValue: data ? data.name : '',
    },
    {
      type: 'text',
      label: 'Name Short',
      name: 'name_short',
      defaultValue: data ? data.name_short : '',
    },
    {
      type: 'select',
      label: 'Type',
      name: 'type',
      options: Object.keys(course_type).map(ct => ({ name: ct, value: ct })),
      defaultValue: data ? data.type : '',
    },
    {
      type: 'select',
      label: 'Category',
      name: 'category',
      options: Object.keys(course_category).map(cc => ({ name: cc, value: cc })),
      defaultValue: data ? data.category : '',
    },
  ]
  return <CreateForm objectName="Course" fields={fields} serverAction={createCourse} />

  // return (
  //   <form action={createCourse} className="bg-gray-200 w-full rounded-md p-2 grid grid-cols-6 gap-x-8 gap-y-2 items-center">
  //     <input type="number" name="department_id" value={department_id} required hidden />

  //     <label htmlFor="course_code">Course Code</label>
  //     <input type="text" name="course_code" required />
  
  //     <label htmlFor="course_name">Course Name</label>
  //     <input type="text" name="course_name" required />

  //     <label htmlFor="course_name_short">Course Name Short</label>
  //     <input type="text" name="course_name_short" required />

  //     <label htmlFor="course_type">Course Type</label>
  //     <select name="course_type" required>
  //       <option value="theory">Theory</option>
  //       <option value="practical">Practical</option>
  //     </select>

  //     <label htmlFor="year_created">Year Created</label>
  //     <input type="number" name="year_created" required />

  //     <button type="submit">
  //       <span className="material-symbols-outlined">add</span>
  //       New Course
  //     </button>
  //   </form>
  // )
}

// "use client";
// import { useFormState } from "react-dom";
// import { createSyllabusCourse } from "@/actions/syllabus_course";

// export default function SyllabusCourseCreate({ syllabus_id, courses }: any) {
//   const [formState, dispatch] = useFormState(createSyllabusCourse, null);

//   let courseItems = courses.map((course: any) => {
//     return <option key={course.course_id} value={course.course_id}>{course.course_name}</option>;
//   });

//   return (
//     <div className="space-y-2">
//       <form action={dispatch} className="bg-gray-200 w-full rounded-md p-2 grid grid-cols-6 gap-2 items-center">
//         <input type="number" name="syllabus_id" defaultValue={syllabus_id} required readOnly hidden />

//         <label htmlFor="code">Syllabus Course Code</label>
//         <input type="text" name="code" required />

//         <label htmlFor="course_id">Course</label>
//         <select name="course_id">
//           {courseItems}
//         </select>

//         <label htmlFor="course_category">Course Category</label>
//         <select name="course_category" required>
//           <option value="core">Core</option>
//           <option value="elective">Elective</option>
//           <option value="project">Project</option>
//           <option value="MOOC">MOOC</option>
//           <option value="foundation">Foundation</option>
//         </select>

//         <label htmlFor="course_credits">Course Credits</label>
//         <input type="number" name="course_credits" required />

//         <label htmlFor="course_semester">Course Semester</label>
//         <input type="number" name="course_semester" required />

//         <button type="submit">
//           <span className="material-symbols-outlined">add</span>
//           New Syllabus Course
//         </button>
//       </form>

//       {formState?.error && <div className="bg-red-300 rounded-md p-2">{formState.error}</div>}
//     </div>
//   );
// }
