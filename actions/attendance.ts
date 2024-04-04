"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function createAttendance(formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.session_attendance.create({
    data: {
      // session_id: parseInt(formData.get("session_id")),
      // user_id: session.user.user_id,
      status: formData.get("status") ? formData.get("status") : "absent",
      // verified: formData.get("verified") == "true" ? true : false,
      position_row: parseInt(formData.get("position_row")?.toString()),
      position_column: parseInt(formData.get("position_column")?.toString()),
      session: {
        connect: {
          session_id: parseInt(formData.get("session_id")),
        },
      },
      user: {
        connect: {
          user_id: session.user.user_id,
        },
      },
    },
  })
  .catch((error) => {
    console.log(error);
    return { error: error }
  });

  return result;
}
async function updateAttendance(formData: FormData) {
  const session: any = await auth()

  const result: any = await prisma.session_attendance.update({
    data: {
      position_row: parseInt(formData.get("position_row")),
      position_column: parseInt(formData.get("position_column")),
      status: formData.get("status"),
    },
    where: {
      // id: parseInt(formData.get("session_attendance_id")),
      session_id_user_id: {
        session_id: parseInt(formData.get("session_id")),
        user_id: session.user.user_id,
      },
    },
  })
  .catch((error) => {
    console.log(error);
    return { error: error }
  })

  return result
}
async function updateAttendancePosition(formData: FormData) {
  const session: any = await auth()

  const result: any = await prisma.session_attendance.update({
    data: {
      position_row: parseInt(formData.get("position_row")),
      position_column: parseInt(formData.get("position_column")),
    },
    where: {
      // id: parseInt(formData.get("session_attendance_id")),
      session_id_user_id: {
        session_id: parseInt(formData.get("session_id")),
        user_id: session.user.user_id,
      },
    },
  })
}
async function updateAttendanceVerification(formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.session_attendance.update({
    data: {
      verified: parseInt(formData.get("verified")),
    },
    where: {
      session_id: parseInt(formData.get("session_id")),
      user_id: parseInt(formData.get("user_id")),
    },
  });
}
async function updateAttendanceStatus(formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.session_attendance.update({
    data: {
      status: formData.get("status"),
    },
    where: {
      session_id: parseInt(formData.get("session_id")),
      user_id: parseInt(formData.get("user_id")),
    },
  });
}
async function createOrUpdateAttendancePosition(formData: FormData) {
  const session: any = await auth()

  // check if the row exists or not. if not then create it
  const session_attendance: any = await prisma.session_attendance.findUnique({
    where: {
      session_id_user_id: {
        user_id: session.user.user_id,
        session_id: parseInt(formData.get("session_id")),
      },
    },
  })

  if (!session_attendance) {
    await createAttendance(formData);
  } else {
    await updateAttendancePosition(formData);
  }

  revalidatePath(`/dashboard`);
}
async function deleteAttendance(formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.session_attendance.deleteMany({
    where: {
      session_id: parseInt(formData.get("session_id")),
      user_id: parseInt(formData.get("user_id")),
    },
  });
}

export { createAttendance, updateAttendance, updateAttendancePosition, updateAttendanceVerification, updateAttendanceStatus, createOrUpdateAttendancePosition, deleteAttendance }
