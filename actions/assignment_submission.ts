'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function createAssignmentSubmission(previousState: any, formData: FormData) {
  const result: any = await prisma.assignment_submission.create({
    data: {
      assignment_id: Number(formData.get("assignment_id")),
      enrollment_id: Number(formData.get("enrollment_id")),
      date: new Date(formData.get("date") as string),
      data: formData.get("data") as string,
    }
  })
  .then((data) => {
    revalidatePath("/dashboard")
    return { data }
  })
  .catch((error) => ({ error }) )

  return result
}
export async function deleteAssignmentSubmission(previousState: any, formData: FormData) {
  const result: any = await prisma.assignment_submission.delete({
    where: {
      // assignment_id_enrollment_id: {
      //   assignment_id: Number(formData.get("assignment_id")),
      //   enrollment_id: Number(formData.get("enrollment_id")),
      // },
      id: Number(formData.get("id")),
    },
  })
  .then((data) => {
    revalidatePath("/dashboard")
    return { data }
  })
  .catch((error) => ({ error: error }) )

  return result
}
