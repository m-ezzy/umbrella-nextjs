"use server";
import { auth, update } from '@/auth';
import { queryDatabase } from '@/lib/database';

export async function getEnrollments() {
  const session:any = await auth();
  const studentEnrollments:any[] = await queryDatabase('SELECT batch_user.enrollment_id,batch.id as batch_id,division.id as division_id,division.name as division_name,batch.year_started,degree.id as degree_id,degree.name as degree_name,degree.name_acronym as degree_name_acronym FROM batch_user INNER JOIN batch ON batch.id=batch_user.batch_id INNER JOIN division ON batch_user.division_id INNER JOIN syllabus ON batch.syllabus_id=syllabus.id INNER JOIN degree on degree.id=syllabus.degree_id WHERE batch_user.user_id=? AND batch_user.division_id=division.id', [ session.user.id ]);

  //add this data to session
  // update({ ...session, studentEnrollments: studentEnrollments });

  return studentEnrollments;
}
export async function getLectures(division_id: number) {
  // const session:any = await auth();
  const lectures:any[] = await queryDatabase('SELECT lecture.id AS lecture_id,lecture.date,lecture.time,lecture.duration,lecture.room_id,course.name_acronym AS course_name_acronym,user.firstname FROM lecture INNER JOIN teaching ON lecture.teaching_id=teaching.id INNER JOIN course ON teaching.course_id=course.id INNER JOIN user ON teaching.professor_id=user.id WHERE teaching.division_id=?', [division_id]);
  
  //add this data to session
  // update({ ...session, studentEnrollments: studentEnrollments });

  return lectures;
}
