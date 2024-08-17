"use client";

export default function SelectCourse({ courses, courseId, setCourseId }: any) {
  let set: any = new Set(courses.map((item: any) => item.course_id));

  const handleChange = (e: any) => setCourseId((prev: any) => e.target.value);

  let courseItems: any[] = courses.map((item: any) => {
    if(set.has(item.course_id)) {
      set.delete(item.course_id);
      return <option key={item.course_id} value={item.course_id}>{item.course_name} ({item.course_name_acronym})</option>;
    }
  });

  return (
    <>
      <label htmlFor="course_id">Course</label>
      <select name="course_id" value={courseId} required onChange={handleChange}>
        {/* <option value=""></option> */}
        {courseItems}
      </select>
    </>
  );
}
