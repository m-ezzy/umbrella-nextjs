"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { degree_type } from "@prisma/client";

export async function createDegree(previousState: any, formData: FormData) {
  const session: any = await auth();
  console.log(formData.getAll("type"));
  
  const result: any = await prisma.degree.create({
    data: {
      name: formData.get("name") as string,
      name_short: formData.get("name_short") as string,
      type: formData.get("type") as degree_type, //formData.get("type") as keyof typeof degree_type,
      department_id: Number(formData.get("department_id")),
    }
  })
  .then((result) => {
    return { success: true }
  })
  .catch((error) => {
    return { error: error }
  });
  revalidatePath("/dashboard/founder");
  return result;
}
export async function deleteDegree(previousState: any, formData: FormData) {
  const session: any = await auth();
  const result: any = await prisma.degree.delete({
    where: {
      id: Number(formData.get("id")),
    }
  })
  .then((result) => {
    return { success: true }
  })
  .catch((error) => {
    console.error(error);
    return { error: error.message };
  });
  revalidatePath("/dashboard/founder");
  return result;
}
