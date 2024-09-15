"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

async function createBatch(previousState: any, formData: FormData) {
  let result: any = await prisma.batch.create({
    data: {
      start_year: Number(formData.get("start_year")),
      finish_year: Number(formData.get("finish_year")),
      current_semester: Number(formData.get("current_semester")),
      syllabus_id: Number(formData.get("syllabus_id")),
    }
  })
  .then((batch) => {
    return { success: true }
  })
  .catch((error) => {
    return { error: error.message }
  });

  if(result.error == undefined) {
    revalidatePath("/dashboard/admin");
  }
  return result;
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
  .catch((error) => {
    return { error }
  });

  revalidatePath("/dashboard/admin");
  return result;
}
async function deleteBatch(formData: FormData) {
  const result = await prisma.batch.delete({
    where: {
      id: Number(formData.get("batch_id"))
    }
  })
  .catch((error) => {
    return { error }
  });

  revalidatePath("/dashboard/admin");
  return result;
}

export { createBatch, updateBatch, deleteBatch }
