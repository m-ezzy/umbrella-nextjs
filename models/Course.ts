import { queryDatabase } from "@/lib/database";

async function select() {
  return await queryDatabase("SELECT * FROM course");
}
async function selectByCourseId(course_id: string) {
  return await queryDatabase("SELECT * FROM course WHERE course_id=?", [course_id]);
}
async function selectWithSyllabusDegreeByDegreeId(degree_id: string) {
  const data = await queryDatabase(`
    SELECT
      course.course_id,course.course_code,course.course_name,course.course_name_acronym,course.course_type,course.year_created,
      syllabus_course.sc_credits,syllabus_course.sc_category,syllabus_course.sc_semester,
      syllabus.syllabus_id,syllabus.year_effective
    FROM
      batch INNER JOIN division ON batch.batch_id=division.batch_id INNER JOIN syllabus ON batch.syllabus_id=syllabus.syllabus_id INNER JOIN syllabus_course ON syllabus_course.syllabus_id=syllabus.syllabus_id INNER JOIN course ON syllabus_course.course_id=course.course_id
    WHERE
      syllabus.degree_id = ?
  `, [degree_id]);
  return data;
}
async function selectWithDivisionBatchSyllabus(degree_id: string) {
  const data = await queryDatabase(`
    SELECT 
      batch.batch_id,batch.year_started,division.division_id,division.division_name,syllabus.syllabus_id, syllabus.year_effective, syllabus_course.sc_semester, course.course_id,course.course_name 
    FROM 
      batch INNER JOIN division ON batch.batch_id=division.batch_id INNER JOIN syllabus ON batch.syllabus_id=syllabus.syllabus_id INNER JOIN syllabus_course ON syllabus_course.syllabus_id=syllabus.syllabus_id INNER JOIN course ON syllabus_course.course_id=course.course_id 
    WHERE 
      syllabus.degree_id = ?
  `, [degree_id]);
  return data;
}
async function insert(course_code: string, course_name: string, course_name_acronym: string, course_type: string, year_created: string) {
  return await queryDatabase("INSERT INTO course (course_code,course_name,course_name_acronym,course_type,year_created) VALUES (?,?,?,?,?)", [course_code, course_name, course_name_acronym, course_type, year_created]);
}
async function update(course_id: string, course_code: string, course_name: string, course_name_acronym: string, course_type: string, year_created: string) {
  return await queryDatabase("UPDATE course SET course_code=?,course_name=?,course_name_acronym=?,course_type=?,year_created=? WHERE course_id=?", [course_code, course_name, course_name_acronym, course_type, year_created, course_id]);
}
async function deleteByCourseId(course_id: string) {
  return await queryDatabase("DELETE FROM course WHERE course_id=?", [course_id]);
}

export { selectWithDivisionBatchSyllabus }
