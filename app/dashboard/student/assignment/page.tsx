'use client'

import useSWR from "swr"
import { assignment } from "@prisma/client"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { useStudentContext } from "@/contexts/StudentContext"
import AssignmentList from "@/components/lists/AssignmentList"

export default function Page() {
  // let session = await auth()
  // let assignments: assignment[] = await prisma.assignment.findMany({
  //   where: {
  //     teaching: {
  //       batch: {
  //         enrollments: {
  //           some: {
  //             user_id: session?.user.id,
  //           },
  //         },
  //       },
  //       division: {
  //         enrollments: {
  //           some: {
  //             user_id: session?.user.id,
  //           },
  //         },
  //       },
  //     },
  //   },
  // })

  let { filters }: any = useStudentContext()
  let course_id = filters.find((filter: any) => filter.name == 'course').options.find((option: any) => option.selected).value
  let division_id = filters.find((filter: any) => filter.name == 'division').options.find((option: any) => option.selected).value
  let professor_id = filters.find((filter: any) => filter.name == 'professor').options.find((option: any) => option.selected).value

  let { isLoading, error, data } = useSWR(`/api/objects/assignment?role=student&course_id=${course_id}&division_id=${division_id}&professor_id=${professor_id}`)

  return (
    <>
      {isLoading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : <AssignmentList data={data.data} />}
    </>
  )
}
