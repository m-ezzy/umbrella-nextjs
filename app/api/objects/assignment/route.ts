import { NextRequest } from "next/server"
import { Session } from "next-auth"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Prisma } from "@prisma/client"

export async function GET(request: NextRequest) {
  const session: Session | null = await auth()
  const searchParams = request.nextUrl.searchParams
  const role: string | null = searchParams.get('role')
  const id: number = parseInt(searchParams.get('id') ?? '0')
  const course_id: number = parseInt(searchParams.get('course_id') ?? '0')
  const batch_id: number = parseInt(searchParams.get('batch_id') ?? '0')
  const division_id: number = parseInt(searchParams.get('division_id') ?? '0')

  let where: Prisma.assignmentWhereInput = {}
  if(role == 'professor') {
    where = {
      teaching: {
        course_id: course_id,
        batch_id: batch_id,
        division_id: division_id,
        professor_id: session?.user.id,
      }
    }
  } else if(role == 'student') {
    let result = await prisma.enrollment.findMany({
      where: {
        batch_id: batch_id,
        division_id: division_id,
        user_id: session?.user.id,
      }
    })
    if(result.length == 0) {
      return Response.json({ error: 'You are not enrolled in this division' })
    }
    where = {
      teaching: {
        course_id: course_id,
        batch_id: batch_id,
        division_id: division_id,
      }
    }
  }

  const res = await prisma.assignment.findMany({
    where: where
  })
  .then((data) => ({ data }) )
  .catch((error) => ({ error: error.message }) )
  return Response.json(res)
}
