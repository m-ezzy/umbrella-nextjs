import { queryDatabase } from '@/lib/database';

async function selectByUserId(user_id: number) {
  const studentEnrollments:any[] = await queryDatabase(`
    SELECT 
      enrollment.enrollment_id,batch.batch_id,batch.year_started,degree.degree_id,degree.degree_name,degree.degree_name_acronym 
    FROM 
      enrollment INNER JOIN batch ON batch.batch_id=enrollment.batch_id INNER JOIN syllabus ON batch.syllabus_id=syllabus.syllabus_id INNER JOIN degree ON degree.degree_id=syllabus.degree_id 
    WHERE 
      enrollment.user_id=?
    `, [ user_id ]);


  console.log(studentEnrollments);
  //add this data to session
  // update({ ...session, studentEnrollments: studentEnrollments });

  return studentEnrollments;
}

export { selectByUserId }
