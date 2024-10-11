'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { syllabusSchema } from '@/lib/data-schemas-zod'

// Server Actions is just for mutating data. don't use it for fetching data
// export async function getSyllabuses(previousState: any, formData: FormData) {
  // const session: any = await auth();
  
  // const params: any = Object.fromEntries(formData.entries()); //data //params

  // const whereObject: Prisma.syllabusWhereInput = {};

  // if(params.syllabus_id) {
  //   whereObject["id"] = Number(params.syllabus_id);
  // } else if(params.degree_id) {
  //   whereObject["degree_id"] = Number(params.degree_id);
  // }
  // if(params.year) {
  //   whereObject["year_effective"] = Number(params.year);
  // }
  // if(params.semester) {
  //   whereObject["duration_semesters"] = Number(params.semester);
  // }

  // if(formData.get("syllabus_id")) {
  //   whereObject["id"] = Number(formData.get("syllabus_id"));
  // } else if(formData.get("degree_id")) {
  //   whereObject["degree_id"] = Number(formData.get("degree_id"));
  // }
  // if(formData.get("year")) {
  //   whereObject["year_effective"] = Number(formData.get("year"));
  // }
  // if(formData.get("semester")) {
  //   whereObject["duration_semesters"] = Number(formData.get("semester"));
  // }

  // const admins = await prisma.admin.findMany({
  //   include: {
  //     degree: {
  //       include: {
  //         syllabuses: true,
  //       },
  //     },
  //   },
  //   where: {
  //     user_id: session.user.id,
  //   },
  // });
  // const result = await prisma.syllabus.findMany({
  //   include: {
  //     _count: {
  //       select: {
  //         courses: true,
  //         batches: true,
  //       },
  //     },
  //     // degree: true,
  //   },
  //   where: {
  //     ...whereObject,
  //     degree: {
  //       admins: {
  //         some: {
  //           user_id: session.user.id,
  //         },
  //       },
  //     },
  //   },
  // })
  // .then((data) => ({ success: true, data: data }) )
  // .catch((error) => ({ error: error.meta?.cause }) );

  // return result;
// }
export async function createSyllabus(previousState: any, formData: FormData) {
  const params: any = Object.fromEntries(formData.entries())

  const validation = syllabusSchema.safeParse(params)
  console.log(validation.error?.flatten())

  if(validation.error) {
    return { error: validation.error.flatten() }
  }

  const result: any = await prisma.syllabus.create({
    // data: params,
    data: {
      degree_id: Number(formData.get("degree_id")),
      code: String(formData.get("code")),
      duration_years: Number(formData.get("duration_years")),
      duration_semesters: parseInt(params.duration_semesters),
      year_effective: Number(formData.get("year_effective")),
    }
  })
  .then((result) => ({ success: true, data: result }) )
  .catch((error) => ({ error: Object.entries(error.meta).toString() }) )

  if(result.success) {
    revalidatePath("/dashboard/admin")
  }
  return result
}
export async function updateSyllabus(previousState: any, formData: FormData) {
  const params: any = Object.fromEntries(formData.entries())

  const result = await prisma.syllabus.update({
    data: {
      year_effective: Number(formData.get("year_effective")),
    },
    where: {
      id: Number(formData.get("syllabus_id")),
    },
  })
  revalidatePath("/dashboard/admin")
}
export async function deleteSyllabus(previousState: any, formData: FormData) {
  const session: any = await auth()

  const result1: any = await prisma.syllabus.findFirst({
    where: {
      id: Number(formData.get("id")),
      degree: {
        admins: {
          some: {
            user_id: session.user.id,
          },
        },
      },
    },
  })

  if(result1.length == 0) return { error: "Unauthorized" }

  const result = await prisma.syllabus.delete({
    where: {
      id: Number(formData.get("id")),
    },
  })
  .then((result) => ({ success: true }) )
  .catch((error) => ({ error: error.meta?.cause }) )

  revalidatePath("/dashboard/admin")
  // revalidateTag("syllabus");
  return result
}
export async function deleteMultipleSyllabus(formData: FormData) {
  const ids = formData.getAll("ids[]").map((id) => Number(id))

  const result = await prisma.syllabus.deleteMany({
    where: {
      id: {
        in: ids,
      },
    }
  })
  .then((result) => ({ success: true }) )
  .catch((error) => ({ error: error.meta?.cause }) )

  revalidatePath("/dashboard/admin")
  return result
}
