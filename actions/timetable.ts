"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { timetable_weekday } from "@prisma/client";

export async function createTimetable(previousState: any, formData: FormData) {
  const result: any = await prisma.timetable.create({
    data: {
      teaching_id: Number(formData.get("teaching_id")),
      weekday: formData.get("weekday") as keyof typeof timetable_weekday, // timetable_weekday[formData.get("weekday") as keyof typeof timetable_weekday],
      start_time: "1970-01-01T" + formData.get("start_time") + ":00.000Z",
      end_time: "1970-01-01T" + formData.get("end_time") + ":00.000Z",
      room_id: Number(formData.get("room_id")),
    }
  })
  .then((result) => {
    return { success: true }
  })
  .catch((error) => {
    return { error: error.message }
  });

  revalidatePath("/dashboard/admin");
  return result;
}
export async function updateTimetable(previousState: any, formData: FormData) {
}
export async function deleteTimetable(previousState: any, formData: FormData) {
  const result: any = await prisma.timetable.delete({
    where: {
      id: Number(formData.get("id"))
    }
  })
  .then((result) => {
    return { success: true }
  })
  .catch((error) => {
    return { error: error.message }
  });
  revalidatePath("/dashboard/admin");
  return result;
}

export async function actionTimetable(previousState: any, formData: FormData) {
  let result;
  
  switch (formData.get("action")) {
    case "create":
      result = await createTimetable(previousState, formData);
      break;
    case "update":
      result = await updateTimetable(previousState, formData);
      break;
    case "delete":
      result = await deleteTimetable(previousState, formData);
      break;
  }

  return result;
}
