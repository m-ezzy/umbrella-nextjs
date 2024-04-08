"use server"
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { attendance_status } from "@prisma/client";

async function createAttendance(formData: FormData) {
  const session: any = await auth();

  const result: any = await prisma.session_attendance.create({
    data: {
      session_id: parseInt(formData.get("session_id")),
      user_id: session.user.user_id,
      // status: formData.get("status") ? formData.get("status") : "absent",
      // verified: formData.get("verified") == "true" ? true : false,
      position_row: parseInt(formData.get("position_row")?.toString()),
      position_column: parseInt(formData.get("position_column")?.toString()),
      // session: {
      //   connect: {
      //     session_id: parseInt(formData.get("session_id")),
      //   },
      // },
      // user: {
      //   connect: {
      //     user_id: session.user.user_id,
      //   },
      // },
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
// async function updateAttendanceVerification(formData: FormData) {
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

async function updateAttendanceStatus(previousState: any, formData: FormData) {
  const session: any = await auth()

  const result: any = await prisma.session_attendance.updateMany({
    data: {
      status: attendance_status.present, // formData.get("status") as attendance_status // attendance_status[formData.get("status") as attendance_status]
    },
    where: {
      session_id: parseInt(formData.get("session_id")),
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
async function createOrUpdateAttendancePosition(formData: FormData) {
  const session: any = await auth()

  const academicSession: any = await prisma.session.findUnique({
    where: {
      session_id: parseInt(formData.get("session_id")),
    },
  });
  if(academicSession.open_for_attendance == false) { return { error: "Session is closed for attendance" } }

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

  const result: any = await prisma.session_attendance.delete({
    where: {
      session_id_user_id: {
        session_id: parseInt(formData.get("session_id")),
        user_id: parseInt(formData.get("user_id")),
      },
    },
  });
  revalidatePath(`/dashboard`);
}

export { createAttendance, updateAttendance, updateAttendancePosition, updateAttendanceStatus, createOrUpdateAttendancePosition, deleteAttendance }
