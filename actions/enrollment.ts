"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createEnrollment(previousState: any, formData: FormData) {
  let result = await prisma.enrollment.create({
    data: {
      enrollment_number: Number(formData.get("enrollment_number")),
      roll_number: String(formData.get("roll_number")),
      batch_id: Number(formData.get("batch_id")),
      division_id: Number(formData.get("division_id")),
      user_id: Number(formData.get("user_id")),
    }
  })
  .catch((error) => {
    return { error: error }
  });

  revalidatePath("/dashboard/admin");
  return result;
}
export async function deleteEnrollment(previousState: any, formData: FormData) {
  let result = await prisma.enrollment.delete({
    where: {
      id: Number(formData.get("id")),
    },
  })
  .catch((error) => {
    return { error: error }
  });

  revalidatePath("/dashboard/admin");
  return result;
}
