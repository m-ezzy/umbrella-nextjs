import { auth } from "@/auth";
import { prisma } from "@/lib/db";

async function createAttendance(formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.session_attendance.create({
    data: {
      session_id: parseInt(formData.get("session_id")),
      user_id: session.user.user_id,
      status: formData.get("status"),
      verified: formData.get("verified") == "true" ? true : false,
      position_row: parseInt(formData.get("position_row")),
      position_column: parseInt(formData.get("position_column")),
    },
  });
}
async function updateAttendancePosition(formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.session_attendance.update({
    data: {
      position_row: parseInt(formData.get("position_row")),
      position_column: parseInt(formData.get("position_column")),
    },
    where: {
      // session_attendance_id: parseInt(formData.get("session_attendance_id")),
      session_id: parseInt(formData.get("session_id")),
      user_id: session.user.user_id,
    },
  });
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
async function deleteAttendance(formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.session_attendance.deleteMany({
    where: {
      session_id: parseInt(formData.get("session_id")),
      user_id: parseInt(formData.get("user_id")),
    },
  });
}

export { createAttendance, updateAttendancePosition, updateAttendanceVerification, updateAttendanceStatus, deleteAttendance };
