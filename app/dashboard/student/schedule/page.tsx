import prisma from "@/lib/prisma"
import { auth } from '@/lib/auth'
import ScheduleCalendar from '@/components/modules/ScheduleCalendar'

export default async function Page({
  params,
  searchParams,
}: {
  params?: any,
  searchParams?: string,
}) {
  const professor_id = 0
  const course_id = 0
  const semester = 0
  console.log(searchParams)

  const session: any = await auth()

  const sessions = await prisma.session.findMany({
    where: {
      teaching: {
        division: {
          enrollments: {
            some: {
              id: parseInt(session.user.id),
            },
          },
        },
      },
    },
  })
  const exams = await prisma.exam.findMany({
    where: {
      enrollments: {
        some: {
          id: parseInt(session.user.id),
        },
      },
    },
  })
  return (
    <>
      <ScheduleCalendar role="student" sessions={sessions} exams={exams} />
    </>
  )
}
