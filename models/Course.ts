import { queryDatabase } from "@/lib/database";

async function selectWithDivisionBatchSyllabus(degree_id: string) {
  const data = await queryDatabase("SELECT batch.id AS batch_id,batch.year_started,division.id AS division_id,division.name AS division_name,syllabus.id AS syllabus_id, syllabus.year_effective, syllabus_course.semester_number AS semester, course.id AS course_id,course.name AS course_name FROM batch INNER JOIN division ON batch.id=division.batch_id INNER JOIN syllabus ON batch.syllabus_id=syllabus.id INNER JOIN syllabus_course ON syllabus_course.syllabus_id=syllabus.id INNER JOIN course ON syllabus_course.course_id=course.id WHERE syllabus.degree_id = ?", [degree_id]);
  return data;
}

export { selectWithDivisionBatchSyllabus }
