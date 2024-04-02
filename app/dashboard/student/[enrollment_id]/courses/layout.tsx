import { ReactNode } from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'
import SemesterItem from './SemesterItem'
import { prisma } from '@/lib/db'

function CourseItem({ course }: any) {
  const headersList = headers();
  const activeUrl = headersList.get("referer");
  const path = activeUrl?.split('/').splice(3, [activeUrl.split('/').length - 1]).join('/');

  return (
    <li key={course.syllabus_course[0].course_semester} className='p-1'>
      <Link href={`/${path}/${course.id}`}>
        {course.course_name}
        <span className='underline p-2'>{course.type}</span>
        {course.course_category}</Link>
    </li>
  );
}
function CourseList({ courses }: any) {
  return(
    <ul>
      {courses.map((course: any) => <CourseItem key={course.course_id} course={course} />)}
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

export default async function Layout({ params, children }: { params: { enrollment_id: string }, children: ReactNode }) {
  const courses: any = await prisma.course.findMany({
    include: {
      syllabus_course: {
        include: {
          syllabus: true,
        },
      },
    },
    where: {
      syllabus_course: {
        some: {
          syllabus: {
            batch: {
              some: {
                enrollments: {
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

  // let numberOfSemesters: number = 0
  // courses.forEach((course:any) => {
  //   if(course.syllabus_course[0].course_semester > numberOfSemesters) {
  //     numberOfSemesters = course.syllabus_course[0].course_semester
  //   }
  // });
  let numberOfSemesters: any = courses[0].syllabus_course[0].syllabus.duration_semesters

  let coursesSemesterWise: any = []
  for(let i = 1; i <= numberOfSemesters; i++) {
    coursesSemesterWise[i] = []
  }

  courses.forEach((course:any) => {
    coursesSemesterWise[course.syllabus_course[0].course_semester].push(course)
  });

  return (
    <div className='flex overflow-auto'>
      <SemesterList coursesSemesterWise={coursesSemesterWise} />
      <div>
        {children}
      </div>
    </div>
  )
}
