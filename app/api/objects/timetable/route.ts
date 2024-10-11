import prisma from "@/lib/prisma"
import { auth } from '@/lib/auth'
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export default async function GET(request: NextRequest) {
  // 1. search params
  // console.log(searchParams)
  // 2. recat context state
  // console.log()





  const degree_id = 0
  const batch_id = 0
  const division_id = 0
  const batch_year = 0
  const division_name = null
  const course_id = 0
  const semester = 0

  let where: Prisma.timetableWhereInput = {}

  if(degree_id > 0 && batch_id > 0 && division_id > 0) {
    where = {
      teaching: {
        division_id: division_id,
      }
    }
  }

  const session: any = await auth()

  const data = await prisma.timetable.findMany({
    include: {
      teaching: {
        include: {
          course: true,
          division: {
            include: {
              batch: {
                include: {
                  syllabus: true,
                },
              },
            },
          },
          professor: true,
        },
      },
      room: true,
    },
    where: {
      teaching: {
        division: {
          enrollments: {
            // every: {
              // user_id: session.user.id,
            // },
            some: {
              id: parseInt(session.user.id),
            },
          },
        },
      },
    }
  })
  .catch((error: any) => ({ error }) )

  return NextResponse.json(data)
}
