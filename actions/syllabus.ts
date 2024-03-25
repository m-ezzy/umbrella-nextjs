"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

async function createSyllabus(formData: FormData) {
  const result1 = await prisma.syllabus.create({
    data: {
      degree_id: Number(formData.get("degree_id")),
      syllabus_code: String(formData.get("syllabus_code")),
      duration_years: Number(formData.get("duration_years")),
      duration_semesters: Number(formData.get("duration_semesters")),
      year_effective: Number(formData.get("year_effective")),
    }
  });
  revalidatePath("/dashboard/admin");
}
async function updateSyllabus(formData: FormData) {
  const result = await prisma.syllabus.update({
    data: {
      year_effective: Number(formData.get("year_effective")),
    },
    where: {
      syllabus_id: Number(formData.get("syllabus_id")),
    },
  });
  revalidatePath("/dashboard/admin");
}
async function deleteSyllabus(formData: FormData) {
  const result = await prisma.syllabus.delete({
    where: {
      syllabus_id: Number(formData.get("syllabus_id")),
    }
  })
  .catch((error) => {
    console.error("Error deleting syllabus", error);
  });
  revalidatePath("/dashboard/admin");
}

export { createSyllabus, updateSyllabus, deleteSyllabus }
