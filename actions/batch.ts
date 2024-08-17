"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"

async function createBatch(previousState: any, formData: FormData) {
  const result = await prisma.batch.create({
    data: {
      year_started: Number(formData.get("year_started")),
      year_ended: Number(formData.get("year_ended")),
      current_semester: Number(formData.get("current_semester")),
      syllabus_id: Number(formData.get("syllabus_id")),
    }
  })

  revalidatePath("/dashboard/admin")

  return result
}
async function updateBatch(formData: FormData) {
  const result = await prisma.batch.update({
    data: {
      year_started: Number(formData.get("year_started")),
      year_ended: Number(formData.get("year_ended")),
      current_semester: Number(formData.get("current_semester")),
      syllabus_id: Number(formData.get("syllabus_id")),
    },
    where: {
      id: Number(formData.get("batch_id"))
    },
  })

  revalidatePath("/dashboard/admin")
  
  return result
}
async function deleteBatch(formData: FormData) {
  const result = await prisma.batch.delete({
    where: {
      id: Number(formData.get("batch_id"))
    }
  })
  .catch((error) => {
    console.error(error)
    return { error }
  })

  revalidatePath("/dashboard/admin")

  return result
}

export { createBatch, updateBatch, deleteBatch }
