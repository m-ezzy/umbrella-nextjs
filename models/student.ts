"use server";
import { auth, update } from '@/auth';
import { queryDatabase } from '@/lib/database';

async function getEnrollments() {
  const session:any = await auth();
  const studentEnrollments:any[] = await queryDatabase('SELECT batch_user.enrollment_id,batch.id as batch_id,division.id as division_id,division.name as division_name,batch.year_started,degree.degree_id,degree.degree_name,degree.degree_name_acronym FROM batch_user INNER JOIN batch ON batch.id=batch_user.batch_id INNER JOIN division ON batch_user.division_id INNER JOIN syllabus ON batch.syllabus_id=syllabus.id INNER JOIN degree on degree.degree_id=syllabus.degree_id WHERE batch_user.user_id=? AND batch_user.division_id=division.id', [ session.user.id ]);

  //add this data to session
  // update({ ...session, studentEnrollments: studentEnrollments });

  return studentEnrollments;
}
async function getCourses(syllabus_id: number) {
  const courses:any[] = await queryDatabase('SELECT course.id,course.name_acronym,course.name FROM syllabus_course INNER JOIN syllabus ON syllabus.id=syllabus_course.syllabus_id INNER JOIN course ON course.id=syllabus_course.course_id WHERE syllabus.id=?', [syllabus_id]);
  return courses;
}
async function getLectures(division_id: number) {
  // const session:any = await auth();
  const lectures:any[] = await queryDatabase('SELECT lecture.id,lecture.date,lecture.start_time,lecture.end_time,lecture.duration,lecture.room_id,floor.number AS floor_number,room.number AS room_number,course.id AS course_id,course.name_acronym AS course_name_acronym,user.name_first,user.name_sur FROM lecture INNER JOIN room ON room.id=lecture.room_id INNER JOIN floor ON room.floor_id=floor.id INNER JOIN teaching ON lecture.teaching_id=teaching.id INNER JOIN course ON teaching.course_id=course.id INNER JOIN user ON teaching.professor_id=user.id WHERE teaching.division_id=? AND lecture.room_id=room.id', [division_id]);
  
  //add this data to session
  // update({ ...session, studentEnrollments: studentEnrollments });

  return lectures;
}
async function getAttendance() {
  const session:any = await auth();
  const attendance:any[] = await queryDatabase('SELECT * FROM lecture_attendance WHERE user_id=?', [session.user.id]);
  return attendance;
}

export { getEnrollments, getCourses, getLectures, getAttendance }
