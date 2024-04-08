"use server"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

async function createSession(formData: FormData) {
  const result = await prisma.session.create({
    data: {
      teaching_id: parseInt(formData.get("teaching_id")),
      date: new Date(formData.get("date")),
      time_start: formData.get("time_start")?.toString() || null,
      time_end: formData.get("time_end")?.toString() || null,
      type: formData.get("session_type"),
      // session_status: formData.get("session_status"),
    }
  })
  .catch((error :any) => {
    return { error: error }
  })

  revalidatePath("/dashboard")
  return result
}
async function updateSession(previousState: any, formData: FormData) {
  console.log(previousState)

  const result = await prisma.session.update({
    where: {
      session_id: Number(formData.get("session_id"))
    },
    data: {
      open_for_attendance: formData.get("open_for_attendance") === "true" ? true : false
    }
  })

  revalidatePath("/dashboard")
  return result
}
async function deleteSession(formData: FormData) {
  const result = await prisma.session.delete({
    where: {
      session_id: Number(formData.get("session_id"))
    }
  })

  revalidatePath("/professor")
}

export { createSession, updateSession, deleteSession }
