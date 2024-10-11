"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createDivision(previousState: any, formData: FormData) {
  const result = await prisma.division.create({
    data: {
      name: String(formData.get("name")),
      batch_id: Number(formData.get("batch_id")),
    }
  })
  .then((result) => ({ success: true }) )
  .catch((error) => ({ error: error.message }) );

  revalidatePath("/dashboard/admin");
  return result;
}
export async function updateDivision(previousState: any, formData: FormData) {
  const result = await prisma.division.update({
    data: {
      name: String(formData.get("division_name")),
    },
    where: {
      id: Number(formData.get("division_id")),
    },
  });

  revalidatePath("/dashboard/admin");
  return result;
}
export async function deleteDivision(previousState: any, formData: FormData) {
  const result = await prisma.division.delete({
    where: {
      id: Number(formData.get("id")),
    },
  })
  .then((result) => ({ success: true }) )
  .catch((error) => ({ error: error.message }) );

  revalidatePath("/dashboard/admin");
  return result;
}
