import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";

export async function GET(request: NextRequest) {
  const session: any = await auth()
  const searchParams = request.nextUrl.searchParams
  const role = searchParams.get('role')
  const batch_id = searchParams.get('batch_id')
  const syllabus_id = searchParams.get('syllabus_id')

  if(role === 'admin') {
    const result = await prisma.batch.findMany({
      select: {
        id: true, 
        start_year: true,
        finish_year: true,
        current_semester: true,
        syllabus_id: true,
        _count: {
          select: {
            admissions: true,
            enrollments: true,
            divisions: true,
          }
        },
      },
      where: {
        syllabus: {
          degree: {
            admins: {
              some: {
                user_id: session.user.id,
              },
            },
          },
        },
      },
      orderBy: {
        start_year: 'asc'
      }
    })
    .then((batches) => ({ data: batches }) )
    .catch((error) => ({ error: error.message }) )

    return Response.json(result);
  }

  const result = await prisma.batch.findMany({
    where: {
      syllabus_id: Number(syllabus_id),
      syllabus: {
        degree: {
          admins: {
            some: {
              user_id: session.user.id,
            },
          },
        },
      },
    },
  })
  .then((batches) => ({ success: true, data: batches }) )
  .catch((error) => ({ error: error.message }) )

  
  return Response.json(result)
}
export async function POST(request: NextRequest) {
  const session: any = await auth()

  let d = await request.json()
  let syllabus_id: number = d.syllabus_id

  // const data = Object.fromEntries((await request.formData()).entries())
  // console.log("data", data)

  const result = await prisma.batch.findMany({
    select: {
      id: true, 
      start_year: true,
      finish_year: true,
      current_semester: true,
      syllabus_id: true,
      _count: {
        select: {
          admissions: true,
          enrollments: true,
          divisions: true,
        }
      },
    },
    where: {
      syllabus_id: syllabus_id,
    },
    orderBy: {
      start_year: 'asc'
    }
  })
  .then((batches) => ({ success: true, data: batches }) )
  .catch((error) => ({ error: error.message }) )

  // const syllabus = await prisma.syllabus.findMany({
  //   select: {
  //     id: true,
  //     duration_semesters: true,
  //     year_effective: true,
  //     year_retired: true,
  //     degree_id: true,
  //   },
  //   where: {
  //     degree_id: Number(params.degree_id),
  //   }
  // })

  return Response.json(result)
}
// export async function POST({ params }: any) {
//   const result = await prisma.batch.create({
//     data: {
//       start_year: Number(params.start_year),
//       finish_year: Number(params.finish_year),
//       syllabus_id: Number(params.syllabus_id),
//     },
//   })
//   .then((result) => ({ success: true, data: result }) )
//   .catch((error) => ({ error: error.message }) )
//   return result
// }
