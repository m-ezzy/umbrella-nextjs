"use server"

import { revalidatePath } from "next/cache"
import { Prisma, batch } from "@prisma/client"
import prisma from "@/lib/prisma"
// import { batchSchema, batch } from "@/lib/data-schemas-zod"

export async function createBatch(syllabus_id: number, previousState: any, formData: FormData) {
  console.log(typeof syllabus_id, previousState, formData)
  
  const params: any = Object.fromEntries(formData.entries())
  
  type FormErrors = Partial<Record<keyof batch, string[]>>

  let result: any = await prisma.batch.create({
    data: {
      start_year: Number(params.start_year),
      finish_year: Number(formData.get("finish_year")),
      current_semester: Number(formData.get("current_semester")),
      syllabus_id: syllabus_id,
    }
  })
  .then((batch) => ({ success: true }) )
  .catch((error) => ({ error: error.message }) );

  if(result.error == undefined) {
    revalidatePath("/dashboard/admin");
  }
  return result;
}
export async function updateBatch(previousState: any, formData: FormData) {
}
export async function deleteBatch(previousState: any, formData: FormData) {
  const result = await prisma.batch.delete({
    where: {
      id: Number(formData.get("id")),
    },
  })
  .then((result) => ({ success: true, result }) )
  .catch((error) => ({ error }) );

  revalidatePath("/dashboard/admin");
  return result;
}
