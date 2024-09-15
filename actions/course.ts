"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { course_type } from "@prisma/client";

async function createCourse(formData: FormData) {
  const result = await prisma.course.create({
    data: {
      code: String(formData.get("code")),
      name: String(formData.get("name")),
      name_acronym: String(formData.get("name_acronym")),
      type: formData.get("course_type") == "theory" ?  course_type.theory : course_type.practical,
      // year_created: Number(formData.get("year_created")),
    }
  })
  .catch((error) => {
    return { error }
  });
  revalidatePath("/dashboard/admin");
  return result;
}
async function updateCourse(formData: FormData) {
  const result = await prisma.course.update({
    data: {
      code: String(formData.get("course_code")),
      name: String(formData.get("course_name")),
      name_acronym: String(formData.get("course_name_acronym")),
      type: formData.get("course_type") == "theory" ?  course_type.theory : course_type.practical,
    },
    where: {
      id: Number(formData.get("course_id")),
    },
  });
  revalidatePath("/dashboard/admin");
}
async function deleteCourse(previousState: any formData: FormData) {
  const result = await prisma.course.delete({
    where: {
      id: Number(formData.get("course_id")),
    }
  })
  .catch((error) => {
    console.error("Error deleting course", error);
    return { error }
  });
  revalidatePath("/dashboard/admin");
  return result;
}

export { createCourse, updateCourse, deleteCourse }
