"use server";
import { queryDatabase } from "@/lib/database";

async function selectAllByDepartment(degree_id: number) {
  const res = await queryDatabase("SELECT department_id FROM degree WHERE degree_id=?", [degree_id]);
  const department_id = res[0].department_id;
  return await queryDatabase("SELECT user.id AS user_id,user.name_prefix,user.name_first,user.name_sur FROM user INNER JOIN department_user ON user.id=department_user.user_id WHERE department_user.department_id=?", [department_id]);
}
async function getEmployments(user_id: number) {
  return await queryDatabase("SELECT department.name AS department_name FROM department_user INNER JOIN department ON department_user.department_id=department.id WHERE department_user.user_id=?", [user_id]);
}
async function getDegrees() {
}
async function getTeaching(user_id: number) {
  return await queryDatabase("SELECT teaching.id AS teaching_id,teaching.course_id,course.name AS course_name,teaching.division_id,division.name AS division_name,batch.id AS batch_id,batch.year_started,degree.degree_id,degree.degree_name FROM teaching INNER JOIN course ON teaching.course_id=course.id INNER JOIN division ON teaching.division_id=division.id INNER JOIN batch ON division.batch_id=batch.id INNER JOIN syllabus ON batch.syllabus_id=syllabus.id INNER JOIN degree ON syllabus.degree_id=degree.degree_id WHERE teaching.professor_id=?", [user_id]);
}
async function getCourses(user_id: number) {
  let courses = await queryDatabase("SELECT course.id AS course_id,course.name AS course_name FROM teaching INNER JOIN course ON teaching.course_id=course.id WHERE teaching.professor_id=?", [user_id]);
  return courses;
}
async function getLectures(user_id: number) {
  let lectures = await queryDatabase("SELECT lecture.id AS lecture_id,lecture.date,lecture.start_time,lecture.end_time,lecture.room_id,teaching.course_id,teaching.division_id,course.name_acronym AS course_name_acronym FROM lecture INNER JOIN teaching ON lecture.teaching_id=teaching.id INNER JOIN course ON teaching.course_id=course.id WHERE teaching.professor_id=?", [user_id]);
  return lectures;
}

export { selectAllByDepartment, getEmployments, getDegrees, getCourses, getTeaching, getLectures }
