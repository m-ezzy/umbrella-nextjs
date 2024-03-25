"use server";
import { auth, update } from '@/auth';
import { queryDatabase } from '@/lib/database';

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

export { getCourses, getLectures, getAttendance }
