"use server";
import { revalidatePath } from "next/cache";
import { insert, update, deleteById } from "@/models/Timetable";

async function createTimetable(formData: FormData) {
  const result:any = await insert(formData.get("teaching_id"), formData.get("weekday"), formData.get("time_start"), formData.get("time_end"), formData.get("room_id"));
  revalidatePath("/admin");
}
async function updateTimetable(formData: FormData) {
  //
}
async function deleteTimetable(formData: FormData) {
  const result:any = await deleteById(formData.get("timetable_id"));
  revalidatePath("/admin");
}

async function actionTimetable(formData: FormData) {
  switch (formData.get("action")) {
    case "create":
      await createTimetable(formData);
      break;
    case "update":
      await updateTimetable(formData);
      break;
    case "delete":
      await deleteTimetable(formData);
      break;
  }
}

export { createTimetable, updateTimetable, deleteTimetable, actionTimetable }
