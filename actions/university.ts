"use server"

import { revalidatePath } from "next/cache"
import zod, { z } from "zod"
import { Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { universitySchema } from "@/lib/data-schemas-zod"
import { delay } from "@/lib/utils"

// POST
// create
export async function createUniversity(previousState: any, formData: FormData) {
  const session: any = await auth()

  // moved this check to middleware
  // if (!session) {
  //   return { error: "no user session found" }
  // }

  // body, data, fields, params, rawFormData
  const fields: any = Object.fromEntries(formData.entries())
  console.log(fields)
  
  // parsedData // validationResult
  const formDataValidated = universitySchema.safeParse(fields)
  console.log(formDataValidated, formDataValidated.success)

  if (!formDataValidated.success) {
    console.log(formDataValidated.error.errors, formDataValidated.error.formErrors)
    return { error: formDataValidated.error.errors }
  }

  const result: any = await prisma.university.create({
    data: {
      ...formDataValidated.data,
      user_id: session.user.id,
    }
  })
  .then((data) => {
    console.log(data)
    revalidatePath("/dashboard/founder")
    return { data }
    // return {
    //   status: "success",
    //   message: "University created successfully",
    // };
  })
  .catch((error) => {
    console.log(error)
    return { error }
    // return {
    //   status: "error",
    //   message: error.message,
    // };
  })

  return result
}

// PUT / PATCH
// update
export async function updateUniversity(previousState: any, formData: FormData) {
}

// DELETE
// remove
export async function deleteUniversity(previousState: any, formData: FormData) {
  const id: number = Number(formData.get("id"))
  const session: any = await auth()

  try {
    const result: any = await prisma.university.findFirstOrThrow({
      where: {
        id: id,
        user_id: session.user.id,
      }
    })
  } catch (error) {
    return { error: "Not Authorized" }
  }
  
  const result: any = await prisma.university.delete({
    where: {
      id: id,
      user_id: session.user.id,
    }
  })
  .then((data) => {
    revalidatePath("/dashboard/founder")
    return { data }
  })
  .catch((error) => ({ error }) )

  return result
}
