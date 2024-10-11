"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { attendance_status, session_attendance } from "@prisma/client";

export async function createAttendance(previousState: any, formData: FormData) {
  // const session: any = await auth();
  // const authorized: boolean = session.user.roles.student.enrollments.includes(formData.get("enrollment_id"));

  const result: any = await prisma.session_attendance.create({
    // can this be done?
    // data: formData,

    data: {
      session_id: parseInt(formData.get("session_id") as string),
      enrollment_id: parseInt(formData.get("enrollment_id") as string),
      position_row: parseInt(formData.get("position_row") as string),
      position_column: parseInt(formData.get("position_column") as string),
      status: formData.get("status") as attendance_status | null,
    },
  })
  .catch((error: any) => {
    console.error(error)
    return { error: error }
  });

  // this should be here or where the request was triggered from
  // revalidatePath("/dashboard")

  revalidateTag("attendance");

  return result;
}
export async function updateAttendance(previousState: any, formData: FormData) {
  const session: any = await auth();

  const data: any = {
    position_row: parseInt(formData.get("position_row") as string),
    position_column: parseInt(formData.get("position_column") as string),
    status: formData.get("status") as string
  }
  if(data.position_row == null) {
    delete data.position_row;
  }
  if(data.position_column == null) {
    delete data.position_column;
  }
  if(data.status == null) {
    delete data.status;
  }

  const result: any = await prisma.session_attendance.update({
    data: {
      position_row: parseInt(formData.get("position_row") as string),
      position_column: parseInt(formData.get("position_column") as string),
      // status: formData.get("status") as string,
    },
    where: {
      id: parseInt(formData.get("session_attendance_id") as string),
    },
  })
  .catch((error) => {
    // console.log(error);
    return { error: error }
  })

  return result
}
export async function updateAttendancePosition(previousState: any, formData: FormData) {
  const session: any = await auth()

  const result: any = await prisma.session_attendance.update({
    data: {
      position_row: parseInt(formData.get("position_row") as string),
      position_column: parseInt(formData.get("position_column") as string),
    },
    where: {
      // id: parseInt(formData.get("session_attendance_id")),
      
      // session_id: parseInt(formData.get("session_id") as string),
      // enrollment_id: session.user.id,
      
      session_id_enrollment_id: {
        session_id: parseInt(formData.get("session_id") as string),
        enrollment_id: session.user.id,
      },
    },
  })
}
// export async function updateAttendanceVerification(formData: FormData) {
//   const session: any = await auth();
//   const result: any = await prisma.session_attendance.update({
//     data: {
//       verified: parseInt(formData.get("verified")),
//     },
//     where: {
//       session_id: parseInt(formData.get("session_id")),
//       user_id: parseInt(formData.get("user_id")),
//     },
//   });
// }

// updateAttendanceStatus.apiDoc = {
//   description: "Update attendance status",
//   tags: ["attendance"],
//   summary: "Update attendance status",
//   operationId: "updateAttendanceStatus",
//   parameters: [
//     {
//       in: "formData",
//       name: "session_id",
//       required: true,
//       type: "string",
//     },
//     {
//       in: "formData",
//       name: "status",
//       required: true,
//       type: "string",
//     },
//   ],
//   responses: {
//     200: {
//       description: "Attendance status updated",
//     },
//     400: {
//       description: "Invalid input",
//     },
//     500: {
//       description: "Server error",
//     },
//   },
// }
export async function updateAttendanceStatus(previousState: any, formData: FormData) {
  const session: any = await auth()

  const result: any = await prisma.session_attendance.updateMany({
    data: {
      status: attendance_status.present, // formData.get("status") as attendance_status // attendance_status[formData.get("status") as attendance_status]
    },
    where: {
      session_id: parseInt(formData.get("session_id") as string),
      NOT: {
        position_row: null,
        position_column: null,
      },
    },
  })
  .catch((error) => {
    return { error: "an error occured" }
  })

  revalidatePath(`/dashboard`)
  return result
}
export async function createOrUpdateAttendancePosition(previousState: any, formData: FormData) {
  const session: any = await auth();

  // const academicSession: any = await prisma.session.findUnique({
  //   where: {
  //     id: parseInt(formData.get("session_id") as string),
  //   },
  // });
  // if(academicSession.open_for_attendance == false) { return { error: "Session is closed for attendance" } }

  // check if the row exists or not. if not then create it
  const session_attendance: any = await prisma.session_attendance.findUnique({
    where: {
      session_id_enrollment_id: {
        enrollment_id: session.user.id,
        session_id: parseInt(formData.get("session_id") as string),
      },
      session: {
        open_for_attendance: true,
      },
    },
  })

  if (!session_attendance) {
    await createAttendance(previousState, formData)
  } else {
    await updateAttendancePosition(previousState, formData)
  }

  revalidatePath(`/dashboard`);
  return { success: true }
}
export async function deleteAttendance(previousState: any, formData: FormData) {
  const result: any = await prisma.session_attendance.delete({
    where: {
      session_id_enrollment_id: {
        session_id: parseInt(formData.get("session_id") as string),
        enrollment_id: parseInt(formData.get("enrollment_id") as string),
      },
    },
  })
  .then((result: any) => ({ success: true }) )
  .catch((error: any) => ({ error }) );

  revalidatePath(`/dashboard`);
  return result;
}
