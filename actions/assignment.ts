"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { assignment_format } from "@prisma/client";

export async function createAssignment(previousState: any, formData: FormData) {
  const result: any = await prisma.assignment.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      format: formData.get("format") as assignment_format,
      graded: formData.get("graded") === "true",
      is_group: formData.get("is_group") === "true",
      deadline: new Date(formData.get("deadline") as string),
      teaching_id: Number(formData.get("teaching_id")),
    }
  })
  .then((result) => ({ success: true }) )
  .catch((error) => ({ error: error.message }) );

  revalidatePath("/dashboard");
  return result;
}
export async function updateAssignment(previousState: any, formData: FormData) {
  const result: any = await prisma.assignment.update({
    where: {
      id: Number(formData.get("id")),
    },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      format: formData.get("format") as assignment_format,
      graded: formData.get("graded") === "true",
      is_group: formData.get("is_group") === "true",
      deadline: new Date(formData.get("deadline") as string),
    }
  })
  .then((result) => ({ success: true }) )
  .catch((error) => ({ error: error.message }) );

  revalidatePath("/dashboard");
  return result;
}
export async function deleteAssignment(previousState: any, formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.assignment.delete({
    where: {
      id: Number(formData.get("id")),
      teaching: {
        professor_id: session.user.id,
      },
    },
  })
  .then((result) => ({ success: true }) )
  .catch((error) => ({ error: error.message }) );

  revalidatePath("/dashboard");
  return result;
}
