"use server";
import { revalidatePath } from "next/cache";
import { insert, update, deleteById } from "@/models (to be deleted)/Timetable";
import { prisma } from "@/lib/db";

async function createTimetable(formData: FormData) {
  const result: any = await prisma.timetable.create({
    data: {
      teaching_id: Number(formData.get("teaching_id")),
      weekday: formData.get("weekday"),
      time_start: "1970-01-01T" + formData.get("time_start") + ":00.000Z",
      time_end: "1970-01-01T" + formData.get("time_end") + ":00.000Z",
      room_id: Number(formData.get("room_id")),
    }
  })
  .catch((error) => {
    console.error("createTimetable error", error);
    return { error: error.code }
  });

  revalidatePath("/dashboard/admin");

  return result;
}
async function updateTimetable(formData: FormData) {
  //
}
async function deleteTimetable(formData: FormData) {
  const result:any = await prisma.timetable.delete({
    where: {
      timetable_id: Number(formData.get("timetable_id"))
    }
  });
  revalidatePath("/dashboard/admin");
}

async function actionTimetable(previousState: any, formData: FormData) {
  let result;

  switch (formData.get("action")) {
    case "create":
      result = await createTimetable(formData);
      break;
    case "update":
      await updateTimetable(formData);
      break;
    case "delete":
      await deleteTimetable(formData);
      break;
  }

  return result;
}

export { createTimetable, updateTimetable, deleteTimetable, actionTimetable }
