import { queryDatabase } from "@/lib/database"

async function select() {
  return await queryDatabase("SELECT teaching.id AS teaching_id,teaching.course_id,course.name AS course_name,teaching.division_id,division.name AS division_name,batch.id AS batch_id,batch.year_started,degree.degree_id,degree.degree_name,teaching.professor_id,user.name_prefix,user.name_first,user.name_sur FROM teaching INNER JOIN course ON teaching.course_id=course.id INNER JOIN division ON teaching.division_id=division.id INNER JOIN batch ON division.batch_id=batch.id INNER JOIN syllabus ON batch.syllabus_id=syllabus.id INNER JOIN degree ON syllabus.degree_id=degree.degree_id INNER JOIN user ON teaching.professor_id=user.id");
}
async function selectTeachingByDegree(degree_id: number) {
  return await queryDatabase(`
    SELECT 
      teaching.teaching_id,teaching.course_id,course.course_name,syllabus_course.course_semester,teaching.division_id,division.division_name,batch.batch_id,batch.year_started,degree.degree_id,degree.degree_name,teaching.professor_id,user.name_prefix,user.name_first,user.name_sur 
    FROM 
      teaching INNER JOIN course ON teaching.course_id=course.id INNER JOIN division ON teaching.division_id=division.id INNER JOIN batch ON division.batch_id=batch.id INNER JOIN syllabus ON batch.syllabus_id=syllabus.id INNER JOIN syllabus_course ON syllabus_course.course_id=course.id INNER JOIN degree ON syllabus.degree_id=degree.degree_id INNER JOIN user ON teaching.professor_id=user.id 
    WHERE syllabus.degree_id = ?
  `, [degree_id]);
}
async function insert(division_id:number, course_id:number, user_id:number) {
  return await queryDatabase("INSERT INTO teaching (division_id,course_id,professor_id) VALUES (?,?,?)", [division_id, course_id, user_id]);
}
async function deleteById(id:number) {
  return await queryDatabase("DELETE FROM teaching WHERE id=?", [id]);
}

export { select, selectTeachingByDegree, insert, deleteById }
