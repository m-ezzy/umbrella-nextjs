"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getDepartments(previousState: any, formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.department.findMany({
    where: {
      university: {
        user_id: session.user.id,
      },
    },
  })
  .then((departments) => {
    return { data: departments };
  })
  .catch((error) => {
    return { error: error.message };
  });
  return result;
}
export async function createDepartment(previousState: any, formData: FormData) {
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
      name_short: formData.get("name_short") as string,
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
export async function updateDepartment(p: any, fd: FormData) {
}
export async function deleteDepartment(previousState: any, formData: FormData) {
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
  .then((result) => {
    return { success: true }
  })
  .catch((error) => {
    console.error(error);
    return { error: error.message };
  });
  revalidatePath("/dashboard/founder");
  return result;
}
