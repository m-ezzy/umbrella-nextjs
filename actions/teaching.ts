"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createTeaching(previousState: any, formData: FormData) {
  const result = await prisma.teaching.create({
    data: {
      batch_id: Number(formData.get("batch_id")) ?? null,
      division_id: Number(formData.get("division_id")) ?? null,
      course_id: Number(formData.get("course_id")),
      professor_id: Number(formData.get("professor_id")),
    }
  })
  .then((result) => {
    return { success: true }
  })
  .catch((error) => {
    return { error: error.message }
  });
  revalidatePath("/admin");
  return result;
}
export async function deleteTeaching(previousState: any, formData: FormData) {
  const result = await prisma.teaching.delete({
    where: {
      id: Number(formData.get("id"))
    }
  })
  .then((result) => {
    return { success: true }
  })
  .catch((error) => {
    return { error: error.message }
  });
  revalidatePath("/dashboard/admin");
  return result;
}
