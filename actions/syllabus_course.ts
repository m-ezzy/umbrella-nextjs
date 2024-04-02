"use server";
import { revalidatePath } from "next/cache";
import { course_category } from "@prisma/client";
import { prisma } from "@/lib/db";

async function createSyllabusCourse(previousState: any, formData: FormData) {
  const result: any = await prisma.syllabus_course.create({
    data: {
      code: String(formData.get("code")),
      syllabus_id: Number(formData.get("syllabus_id")),
      course_id: Number(formData.get("course_id")),
      course_category: formData.get("course_category"),
      course_credits: Number(formData.get("course_credits")),
      course_semester: Number(formData.get("course_semester")),
    }
  })
  .catch((error) => {
    return { error: error.code }
  });

  if(result.error == "P2002") {
    return { error: "Course already in syllabus" }
  } else {
    revalidatePath("/dashboard/admin");
  }
}

async function deleteSyllabusCourse(formData: FormData) {
  const result = await prisma.syllabus_course.delete({
    where: {
      syllabus_id_course_id: {
        syllabus_id: Number(formData.get("syllabus_id")),
        course_id: Number(formData.get("course_id")),
      },
    }
  })
  .catch((error) => {
    console.error("Error deleting syllabus course", error);
  });
  revalidatePath("/dashboard/admin");
}

export { createSyllabusCourse, deleteSyllabusCourse }
