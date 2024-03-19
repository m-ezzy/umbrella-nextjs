"use server";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

async function userLogout(formData: FormData) {
  await signOut();
  revalidatePath("/");
  redirect("/login");
}

export { userLogout }
