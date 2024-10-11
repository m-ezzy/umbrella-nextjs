import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const session: any = await auth()
  // request.cookies.getAll()
  // const { course_id, semester, batch_id, syllabus_id, professor_id, degree_id, department_id, university_id }: any = request.json()
  const department_id = request.nextUrl.searchParams.getAll("department_id")

  const res = await prisma.degree.findMany({
    where: {
      admins: {
        some: {
          user_id: session.user.id
        },
      },
    },
  })
  .then((data) => ({ data }) )
  .catch((error) => ({ error }) )

  return NextResponse.json(res)
}
