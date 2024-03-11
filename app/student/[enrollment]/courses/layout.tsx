import { queryDatabase } from '@/lib/database'
import Link from 'next/link'

export default async function Layout({ children, params }: any) {
  const data1 = await queryDatabase(`SELECT batch_id FROM batch_user WHERE enrollment_id=${params.enrollment}`)
  // console.log(data1)
  const data2 = await queryDatabase(`SELECT syllabus_id FROM batch WHERE id=${data1[0].batch_id}`)
  // console.log(data2)
  const data = await queryDatabase(`SELECT course.id,course.name,course.name_acronym,course.type,syllabus_course.category,syllabus_course.semester_number FROM syllabus_course INNER JOIN course ON syllabus_course.course_id=course.id WHERE syllabus_id=${data2[0].syllabus_id}`)
  // console.log(data3)

  const courses: any[] = data

  let numberOfSemesters: number = 0
  courses.forEach((course:any) => {
    if(course.semester_number > numberOfSemesters) {
      numberOfSemesters = course.semester_number
    }
  });
  let coursesSemesterWise: any = []
  for(let i = 1; i <= numberOfSemesters; i++) {
    coursesSemesterWise[i] = []
  }
  courses.forEach((course:any) => {
    coursesSemesterWise[course.semester_number].push(course)
  });

  return (
    <div>
      <SemesterList coursesSemesterWise={coursesSemesterWise} />
      <div>
        {children}
      </div>
    </div>
  )
}

function CourseItem({ course }: any) {
  return (
    <li key={course.semester_number} className='p-1'>
      <Link href={`${course.id}`}>
        {course.name}
        <span className='underline p-2'>{course.type}</span>
        {course.category}</Link>
    </li>
  );
}
function CourseList({ courses }: any) {
  return(
    <ul>
      {courses.map((course: any) => <CourseItem key={course.id} course={course} />)}
    </ul>
  );
}
function SemesterItem({ semester_number, courses }: any) {
  function handleClickSemester(e: any) {
    console.log(semester_number);
  }
  return (
    <div key={semester_number} className='bg-gray-100'>
      <h2 className='bg-gray-300'>Semester {semester_number}</h2>
      <CourseList courses={courses} />
    </div>
  );
}
function SemesterList({ coursesSemesterWise }: any) {
  return(
    <ul className='p-2 space-y-2'>
      {coursesSemesterWise.map((courses: any, index: number) => <SemesterItem key={index} semester_number={index} courses={courses} />)}
    </ul>
  );
}
