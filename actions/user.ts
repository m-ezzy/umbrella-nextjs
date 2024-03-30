"use server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, signOut } from "@/auth";

async function updateUser(formData: FormData) {
  // const session:any = await auth();
  // const user:any = session.user;
  // const user_id = user.user_id;
  // const url = `/api/user/${user_id}`;

  const fileField = formData.get("file");

  if (!fileField) {
    return NextResponse.json({}, { status: 400 });
  }

  const file = fileField as File;
  console.log(`File name: ${file.name} Content-Length: ${file.size}`.bgMagenta);

  const destinationDirPath = path.join(process.cwd(), "@/data/user/profile_pictures/");

  const fileArrayBuffer = await file.arrayBuffer();

  if (!existsSync(destinationDirPath)) {
    fs.mkdir(destinationDirPath, { recursive: true });
  }
  await fs.writeFile(
    path.join(destinationDirPath, file.name),
    Buffer.from(fileArrayBuffer)
  );

  return NextResponse.json({
    fileName: file.name,
    size: file.size,
    lastModified: new Date(file.lastModified),
  });
}

export { updateUser }
