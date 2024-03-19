"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { insert } from "@/models/Teaching";

async function createTeaching(formData: FormData) {
  const result:any = await insert(formData.get("date"), formData.get("start_time"), formData.get("end_time"), formData.get("teaching_id"), formData.get("room_id"));
  revalidatePath("/admin");
}

export { createTeaching }
