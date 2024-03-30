import { ReactNode } from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'
import SemesterItem from './SemesterItem'
import { prisma } from '@/lib/db'

export default async function Layout({ children, params }: { children: ReactNode, params: { enrollment_id: string } }) {
  // const data1 = await queryDatabase(`SELECT batch_id FROM batch_user WHERE enrollment_id=${params.enrollment_id}`)
  // console.log(data1)
  // const data2 = await queryDatabase(`SELECT syllabus_id FROM batch WHERE id=${data1[0].batch_id}`)
  // console.log(data2)
  // const data = await queryDatabase(`SELECT course.id,course.name,course.name_acronym,course.type,syllabus_course.category,syllabus_course.semester_number FROM syllabus_course INNER JOIN course ON syllabus_course.course_id=course.id WHERE syllabus_id=${data2[0].syllabus_id}`)
  // console.log(data3)

  const courses: any = await prisma.course.findMany({
    include: {
      syllabus_course: true,
    },
    where: {
      syllabus_course: {
        some: {
          syllabus: {
            batch: {
              some: {
                enrollment: {
                  some: {
                    enrollment_id: parseInt(params.enrollment_id)
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  console.log(courses[0])

  let numberOfSemesters: number = 0
  courses.forEach((course:any) => {
    if(course.syllabus_course[0].course_semester > numberOfSemesters) {
      numberOfSemesters = course.syllabus_course[0].course_semester
    }
  });
  let coursesSemesterWise: any = []
  for(let i = 1; i <= numberOfSemesters; i++) {
    coursesSemesterWise[i] = []
  }
  courses.forEach((course:any) => {
    coursesSemesterWise[course.syllabus_course[0].course_semester].push(course)
  });

  return (
    <div className='flex'>
      <SemesterList coursesSemesterWise={coursesSemesterWise} />
      <div>
        {children}
      </div>
    </div>
  )
}

function CourseItem({ course }: any) {
  const headersList = headers();
  const activeUrl = headersList.get("referer");
  console.log(activeUrl);
  const path = activeUrl?.split('/').splice(3, [activeUrl.split('/').length - 1]).join('/');
  console.log(path);

  return (
    <li key={course.syllabus_course[0].course_semester} className='p-1'>
      <Link href={`/${path}/${course.id}`}>
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
function SemesterList({ coursesSemesterWise }: any) {
  return(
    <ul className='border-r p-2 space-y-2'>
      {coursesSemesterWise.map((courses: any, index: number) => <SemesterItem key={index} semester_number={index} courses={courses}><CourseList courses={courses} /></SemesterItem>)}
    </ul>
  );
}
