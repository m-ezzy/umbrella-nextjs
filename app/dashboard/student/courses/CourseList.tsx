"use server"
import { ReactNode } from 'react'
import Link from 'next/link'
import { prisma } from '@/lib/db'

export default async function CourseList({ courses, university, department, semester }: any) {
  console.log('CourseList'.bgMagenta, semester);

  const coursesAll: any = await prisma.course.findMany({
    where: {
      semester: { in: semester },
      syllabus: {
        degree: {
          AND: [
            // { department: { university: university }, },
            // { department: department },
          ],
        },
      },
      AND: [
        // { semester: filters.semester },
        // { category: filters.category },
        // { type: filters.type },
      ],
    },
  });
  
  // { key: 'description', title: 'Description', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/description`, icon: '📚' }, // code, type, category, credits, books, chapters, objectives, outcome, ...
  // { key: 'content', title: 'Content', link: `/dashboard/views/tree/student/${params.enrollment_id}/semester/${params.semester}/courses/${params.course_id}/content`, icon: '📚' },
  
  const items: any = coursesAll.map((course: any) => {
    return (
      <li key={course.id} className='border-b'>
        <Link href={`/dashboard/student/courses/${course.id}`} className='grid grid-cols-5'>
          <span>{course.name}</span>
          <span>{course.name_acronym}</span>
          <span>{course.category}</span>
          <span>{course.type}</span>
          <span>{course.semester}</span>
        </Link>
      </li>
    );
  });
  return (
    <ul className='bg-gray-200 block m-4 rounded p-2 space-y-2'>
      <div className='bg-slate-400 grid grid-cols-5 rounded p-2'>
        <span>Course</span>
        <span>Acronym</span>
        <span>Category</span>
        <span>Type</span>
      </div>
      {items}
    </ul>
  );
}
