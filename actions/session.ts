"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function createSession(formData: FormData) {
  const result = await prisma.session.create({
    data: {
      date: new Date(formData.get("date")),
      time_start: formData.get("time_start")?.toString() || null,
      time_end: formData.get("time_end")?.toString() || null,
      session_type: formData.get("session_type"),
      session_status: formData.get("session_status"),
    }
  });
  revalidatePath("/professor");
}
async function deleteSession(formData: FormData) {
  const result = await prisma.session.delete({
    where: {
      session_id: Number(formData.get("session_id"))
    }
  });
  revalidatePath("/professor");
}

export { createSession, deleteSession }
