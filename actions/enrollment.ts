"use server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"

async function createEnrollment(previousState: any, formData: FormData) {
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
  })

  revalidatePath("/dashboard/admin")
  return result
}
async function deleteEnrollment(formData: FormData) {
  let result = await prisma.enrollment.delete({
    where: {
      enrollment_id: Number(formData.get("enrollment_id"))
    }
  })
  .catch((error) => {
    return { error: error }
  })

  revalidatePath("/dashboard/admin")
  return result
}

export { createEnrollment, deleteEnrollment }
