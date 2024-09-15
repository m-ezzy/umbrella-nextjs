"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

async function createUniversity(previousState: any, formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.university.create({
    data: {
      name: formData.get("name") as string,
      name_acronym: formData.get("name_acronym") as string,
      user_id: session.user.id,
    }
  })
  .catch((error) => {
    return { error: error.message }
    // return {
    //   status: "error",
    //   message: error.message,
    // };
  });

  revalidatePath("/dashboard/founder");

  if(result.error) {
    return result;
  } else {
    return { success: "University created successfully" }
    // return {
    //   status: "success",
    //   message: "University created successfully",
    // };
  }
}
async function deleteUniversity(previousState: any, formData: FormData) {
  const result: any = await prisma.university.delete({
    where: {
      id: Number(formData.get("id"))
    }
  })
  .catch((error) => {
    console.error(error);
    return { error: error.message };
  });
  revalidatePath("/dashboard/founder");
  return result;
}

export { createUniversity, deleteUniversity }
