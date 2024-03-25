"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

async function createDivision(formData: FormData) {
  const result = await prisma.division.create({
    data: {
      batch_id: Number(formData.get("batch_id")),
      division_name: String(formData.get("division_name")),
    }
  })
  .catch((error) => {
    console.error("Error creating division", error);
  });
  revalidatePath("/dashboard/admin");
}
async function updateDivision(formData: FormData) {
  const result = await prisma.division.update({
    data: {
      division_name: String(formData.get("division_name")),
    },
    where: {
      division_id: Number(formData.get("division_id"))
    },
  });
  revalidatePath("/dashboard/admin");
}
async function deleteDivision(formData: FormData) {
  const result = await prisma.division.delete({
    where: {
      division_id: Number(formData.get("division_id"))
    }
  });
  revalidatePath("/dashboard/admin");
}
export { createDivision, updateDivision, deleteDivision }
