"use server";

import { revalidatePath } from "next/cache";
import { create, remove, update } from "@/lib/data-access-layer/course";

export async function createCourse(previousState: any, formData: FormData) {
  const params: any = Object.fromEntries(formData.entries());
  const result: any = await create(params);
  if(result.data) revalidatePath("/dashboard/admin");
  return result;
}
export async function updateCourse(previousState: any, formData: FormData) {
  const params: any = Object.fromEntries(formData.entries());
  const result: any = await update(params);
  if(result.data) revalidatePath("/dashboard/admin");
  return result;
}
export async function deleteCourse(previousState: any, formData: FormData) {
  const params: any = Object.fromEntries(formData.entries());
  const result: any = await remove(params.id);
  if(result.data) revalidatePath("/dashboard/admin");
  return result;
}
