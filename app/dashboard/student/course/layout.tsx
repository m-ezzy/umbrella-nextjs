// "use client"
import { ReactNode, Suspense } from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'
import { useParams, useSearchParams } from 'next/navigation'
import { useStudentContext } from '@/contexts/StudentContext'
import prisma from "@/lib/prisma"
import { auth } from '@/lib/auth'
import CourseList from '@/components/lists/CourseList'
import ListTable from '@/components/ui/advanced/ListTable'

export default async function Layout({ params, children }: any) {
  const session: any = await auth();

  // console.log(useParams())
  // console.log(useSearchParams())
  // let { university, department, degree, syllabus, semester }: any = useStudentContext();

  const coursesAll: any = await prisma.course.findMany({
    where: {
      syllabus: {
        batches: {
          some: {
            enrollments: {
              some: {
                user_id: session.user.id,
              },
            },
          }
        },
      },
    },
    // where: {
    //   semester: { in: semester },
    //   syllabus: {
    //     degree: {
    //       AND: [
    //         // { department: { university: university }, },
    //         // { department: department },
    //       ],
    //     },
    //   },
    //   AND: [
    //     // { semester: filters.semester },
    //     // { category: filters.category },
    //     // { type: filters.type },
    //   ],
    // },
  });
  return (
    <div className='p-4'>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <ListTable data={coursesAll} />
        {/* <CourseList university={university} department={department} degree={degree} syllabus={syllabus} semester={semester} /> */}
        {children}
      {/* </Suspense> */}
    </div>
  );
}
