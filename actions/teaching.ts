"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { insert, deleteById } from "@/models/Teaching";

async function createTeaching(formData: FormData) {
  const result:any = await insert(formData.get("division_id"), formData.get("course_id"), formData.get("professor_id"));
  revalidatePath("/admin");
}
async function deleteTeaching(formData: FormData) {
  const result:any = await deleteById(formData.get("teaching_id"));
  revalidatePath("/admin");
}

export { createTeaching, deleteTeaching }
