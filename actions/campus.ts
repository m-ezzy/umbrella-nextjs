"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function createCampus(previousState: any, formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.campus.create({
    data: {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      country: formData.get("country") as string,
      pincode: Number(formData.get("pincode")),
      gate_count: Number(formData.get("gate_count")),
      university_id: Number(formData.get("university_id")),
    }
  })
  .then((result) => {
    // return { success: "Campus created successfully" }
    return { success: true }
  })
  .catch((error) => {
    return { error: error.message }
  });

  revalidatePath("/dashboard");
  revalidateTag("campus");
  
  return result;
}
export async function deleteCampus(previousState: any, formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.campus.delete({
    where: {
      id: Number(formData.get("campus_id")),
      university: {
        user_id: session.user.id,
      },
    },
  })
  .then((result) => {
    // return { success: "Campus deleted successfully" }
    return { success: true }
  })
  .catch((error) => {
    return { error: error.message };
  });

  revalidatePath("/dashboard");
  revalidateTag("campus");

  return result;
}
