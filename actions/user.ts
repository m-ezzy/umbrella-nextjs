"use server"

import path from "path"
import fs from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth, update } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function createUser(previousState: any, formData: FormData) {
  const result:any = await prisma.user.create({
    data: {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      name_prefix: formData.get("name_prefix") as string,
      name_first: formData.get("name_first") as string,
      name_middle: formData.get("name_middle") as string,
      name_last: formData.get("name_last") as string,
      name_suffix: formData.get("name_suffix") as string,
      contact_no: formData.get("contact_no") as string,
      email: formData.get("email") as string,
    },
  })
  .catch((error: any) => {
    return { error: error.message, status: 400 }
  });

  return { result }
  // return NextResponse.redirect("/account/personal");
  // redirect("/account/personal");
}
export async function updateUser(formData: FormData) {
  const session: any = await auth()
  const user_id = session.user.id

  const result:any = await prisma.user.update({
    where: { id: user_id },
    data: {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      name_prefix: formData.get("name_prefix") as string,
      name_first: formData.get("name_first") as string,
      name_middle: formData.get("name_middle") as string,
      name_last: formData.get("name_sur") as string,
      name_suffix: formData.get("name_suffix") as string,
      contact_no: formData.get("primary_phone") as string,
      email: formData.get("primary_email") as string,
    },
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error: error.message, status: 400 }) );
  return result;
}
export async function updateUserProfilePicture(formData: FormData) {
  const fileField: File | null = formData.get("profile_picture") as unknown as File;
  if (!fileField) {
    return { error: "No file was provided", status: 400 }
  }

  const file = fileField as File
  console.log(`File name: ${file.name} Content-Length: ${file.type}`.bgMagenta)

  const session: any = await auth();

  const destinationPath = path.join(process.cwd(), `/public/data/user/profile_pictures/${file.name}`)
  // if (!path.existsSync(destinationPath)) {
  //   fs.mkdir(destinationPath, { recursive: true })
  // }

  const fileArrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(fileArrayBuffer)
  await fs.writeFile(destinationPath, buffer)
  
  //delete the old file
  if(formData.get("old_profile_picture") != "") {
    const oldFile = path.join(process.cwd(), `/public/data/user/profile_pictures/${formData.get("old_profile_picture")}`)
    let result = await fs.rm(oldFile).catch((error: any) => {
      return { error: error.message }
    })
  }

  // update the user profile picture url in the database
  const result: any = await prisma.user.update({
    data: {
      profile_picture_url: file.name,
    },
    where: { id: session.user.id },
  })
  .catch((error: any) => {
    return { error: error.message, status: 400 }
  })

  revalidatePath("/settings/account")

  return result
}
export async function deleteAccount(previousState: any, formData: FormData) {
  const session: any = await auth();
  const user_id = session.user.id;

  const result:any = await prisma.user.delete({
    where: { id: user_id },
  })
  .catch((error: any) => {
    return { error: error.message, status: 400 }
  });
  
  update({
    user: { id: undefined }
  });

  redirect("/");
  // return { result }
}
