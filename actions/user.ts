"use server";
import path from "path";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

async function createUser(formData: FormData) {
  const result:any = await prisma.user.create({
    data: {
      username: formData.get("username"),
      password: formData.get("password"),
      name_prefix: formData.get("name_prefix"),
      name_first: formData.get("name_first"),
      name_middle: formData.get("name_middle"),
      name_sur: formData.get("name_sur"),
      name_suffix: formData.get("name_suffix"),
      primary_phone: formData.get("primary_phone"),
      primary_email: formData.get("primary_email"),
    },
  })
  .catch((error: any) => {
    return { error: error.message, status: 400 }
  });

  return { result }
  // return NextResponse.redirect("/account/personal");
  // redirect("/account/personal");
}
async function updateUser(formData: FormData) {
  const session: any = await auth()
  const user_id = session.user.user_id

  const result:any = await prisma.user.update({
    where: { user_id: user_id },
    data: {
      username: formData.get("username"),
      password: formData.get("password"),
      name_prefix: formData.get("name_prefix"),
      name_first: formData.get("name_first"),
      name_middle: formData.get("name_middle"),
      name_sur: formData.get("name_sur"),
      name_suffix: formData.get("name_suffix"),
      primary_phone: formData.get("primary_phone"),
      primary_email: formData.get("primary_email"),
    },
  })
  .catch((error: any) => {
    return { error: error.message, status: 400 }
  });

  return { result }
}
async function updateUserProfilePicture(formData: FormData) {
  const fileField: File | null = formData.get("profile_picture") as unknown as File;
  if (!fileField) {
    return { error: "no file was provided", status: 400 }
  }

  const file = fileField as File
  console.log(`File name: ${file.name} Content-Length: ${file.type}`.bgMagenta)

  const session: any = await auth()

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
    await fs.rm(oldFile)
  }

  // update the user profile picture url in the database
  const result: any = await prisma.user.update({
    data: {
      profile_picture_url: file.name,
    },
    where: { user_id: session.user.user_id },
  })
  .catch((error: any) => {
    return { error: error.message, status: 400 }
  });

  revalidatePath("/account/personal")

  return { result }
}

export { createUser, updateUser, updateUserProfilePicture };
