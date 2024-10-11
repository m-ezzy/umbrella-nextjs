"use server";

import prisma from "@/lib/prisma";
import { session_type } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createSession(previousState: any, formData: FormData) {
  const result = await prisma.session.create({
    data: {
      teaching_id: parseInt(formData.get("teaching_id") as string),
      start_time: new Date(formData.get("start_time") as string), // || null,
      end_time: new Date(formData.get("end_time") as string),
      type: formData.get("session_type") as session_type,
      room_id: parseInt(formData.get("room_id") as string),
    }
  })
  .then((result :any) => ({ success: true }) )
  .catch((error :any) => ({ error: error }) );

  revalidatePath("/dashboard");
  return result;
}
export async function updateSession(previousState: any, formData: FormData) {
  const result = await prisma.session.update({
    where: {
      id: Number(formData.get("session_id")),
    },
    data: {
      open_for_attendance: formData.get("open_for_attendance") === "true" ? true : false,
    },
  })
  .then((result :any) => ({ success: true }) )
  .catch((error :any) => ({ error: error }) );

  revalidatePath("/dashboard");
  return result;
}
export async function deleteSession(previousState: any, formData: FormData) {
  const result = await prisma.session.delete({
    where: {
      id: Number(formData.get("id")),
    },
  })
  .then((result :any) => ({ success: true }) )
  .catch((error :any) => ({ error: error }) );

  revalidatePath("/dashboard");
  return result;
}
