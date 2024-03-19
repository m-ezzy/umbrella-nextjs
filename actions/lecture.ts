"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { insert } from "@/models/Lecture";

async function createLecture(formData: FormData) {
  // ... create lecture
  const r = await insert(formData.get("date"), formData.get("start_time"), formData.get("end_time"), formData.get("teaching_id"), formData.get("room_id"));
  revalidatePath("/professor/lectures");
}

export { createLecture }
