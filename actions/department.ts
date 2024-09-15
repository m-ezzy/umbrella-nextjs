"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

async function createDepartment(previousState: any, formData: FormData) {
  const session: any = await auth();

  const university: any = await prisma.university.findUnique({
    where: {
      id: Number(formData.get("university_id")),
      user_id: session.user.id, //validating that the user is the founder of this university
    },
  })
  if (!university) {
    return { error: "University does not exist or you do not have permission to create a department for this university." };
  }
  const result: any = await prisma.department.create({
    data: {
      name: formData.get("name") as string,
      name_acronym: formData.get("name_acronym") as string,
      university_id: Number(formData.get("university_id")),
    }
  })
  .then((result) => {
    return { success: true }
  })
  .catch((error) => {
    return { error: error.message }
  });

  revalidatePath("/dashboard/founder");
  return result;
}
async function deleteDepartment(previousState: any, formData: FormData) {
  const session: any = await auth();

  const department: any = await prisma.department.findUnique({
    where: {
      id: Number(formData.get("id")),
      university: {
        user_id: session.user.id,
      },
    },
  });
  if (!department) {
    return { error: "Department does not exist or you do not have permission to delete this department." };
  }
  const result: any = await prisma.department.delete({
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

export { createDepartment, deleteDepartment }
