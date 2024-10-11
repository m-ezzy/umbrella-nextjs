"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createBuilding(previousState: any, formData: FormData) {
  let result: any = await prisma.building.create({
    data: {
      name: formData.get("name") as string,
      campus_id: Number(formData.get("campus_id")),
    }
  })
  .then((building) => ({ success: true }) )
  .catch((error) => ({ error: error.message }) );

  if(result.success) {
    revalidatePath("/dashboard");
  }
  return result;
}
export async function updateBuilding(previousState: any, formData: FormData) {
}
export async function deleteBuilding(previousState: any, formData: FormData) {
  const result: any = await prisma.building.delete({
    where: {
      id: Number(formData.get("id")),
    },
  })
  .then((building) => ({ success: true }) )
  .catch((error) => ({ error: error.message }) );

  if(result.success) revalidatePath("/dashboard/admin");
  return result;
}
