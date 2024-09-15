"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

async function createTeaching(formData: FormData) {
  const result = await prisma.teaching.create({
    data: {
      course_id: Number(formData.get("course_id")),
      division_id: Number(formData.get("division_id")),
      professor_id: Number(formData.get("professor_id")),
    }
  });
  revalidatePath("/admin");
}
async function deleteTeaching(formData: FormData) {
  const result:any = await prisma.teaching.delete({
    where: {
      id: Number(formData.get("teaching_id"))
    }
  });
  revalidatePath("/dashboard/admin");
}

export { createTeaching, deleteTeaching }
