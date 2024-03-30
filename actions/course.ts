"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { course_type } from "@prisma/client";

async function createCourse(formData: FormData) {
  const result1 = await prisma.course.create({
    data: {
      course_code: String(formData.get("course_code")),
      course_name: String(formData.get("course_name")),
      course_name_acronym: String(formData.get("course_name_acronym")),
      course_type: formData.get("course_type") == "theory" ?  course_type.theory : course_type.practical,
      year_created: Number(formData.get("year_created")),
    }
  });

  console.log(result1, formData.get("syllabus_id"), formData.get("course_semester"), formData.get("course_credits"));

  const result2 = await prisma.syllabus_course.create({
    data: {
      syllabus_id: Number(formData.get("syllabus_id")),
      course_id: result1.course_id,
      course_semester: Number(formData.get("course_semester")),
      course_credits: Number(formData.get("course_credits")),
    }
  });
  revalidatePath("/dashboard/admin");
}
async function updateCourse(formData: FormData) {
  const result = await prisma.course.update({
    data: {
      course_code: String(formData.get("course_code")),
      course_name: String(formData.get("course_name")),
      course_name_acronym: String(formData.get("course_name_acronym")),
      course_type: formData.get("course_type") == "theory" ?  course_type.theory : course_type.practical,
    },
    where: {
      course_id: Number(formData.get("course_id")),
    },
  });
  revalidatePath("/dashboard/admin");
}
async function deleteCourse(formData: FormData) {
  const result = await prisma.course.delete({
    where: {
      course_id: Number(formData.get("course_id")),
    }
  })
  .catch((error) => {
    console.error("Error deleting course", error);
  });
  revalidatePath("/dashboard/admin");
}

export { createCourse, updateCourse, deleteCourse }
