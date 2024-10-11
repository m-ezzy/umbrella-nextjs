// canView
// canMutate (canCreate, canUpdate, canDelete)

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

const session: any = await auth()

let adminLevelWhere = {
  degree: {
    admins: {
      some: {
        user_id: session.user.id,
      },
    },
  },
}

export async function canMutateUniversity(user_id: number, university_id: number) {
  const result = await prisma.university.findFirst({
    where: {
      id: university_id,
      user_id: user_id,
    },
  })
  return !(result == undefined)
}
export async function canMutateCampus(user_id: number, campus_id: number) {
  const result = await prisma.campus.findFirst({
    where: {
      id: campus_id,
      university: {
        user_id: user_id,
      },
    },
  })
  return !(result == undefined)
}
export async function canMutateBuilding(user_id: number, building_id: number) {
  const result = await prisma.building.findFirst({
    where: {
      id: building_id,
      campus: {
        university: {
          user_id: user_id,
        },
      },
    },
  })
  return !(result == undefined)
}
export async function canMutateFloor(user_id: number, floor_id: number) {
  const result = await prisma.floor.findFirst({
    where: {
      id: floor_id,
      building: {
        campus: {
          university: {
            user_id: user_id,
          },
        },
      },
    },
  })
  return !(result == undefined)
}
export async function canMutateRoom(user_id: number, room_id: number) {
  const result = await prisma.room.findFirst({
    where: {
      id: room_id,
      floor: {
        building: {
          campus: {
            university: {
              user_id: user_id,
            },
          },
        },
      },
    },
  })
  return !(result == undefined)
}
export async function canMutateDepartment(user_id: number, department_id: number) {
  const result = await prisma.department.findFirst({
    where: {
      id: department_id,
      university: {
        user_id: user_id,
      },
    },
  })
  return !(result == undefined)
}
export async function canMutateAdmin(user_id: number, degree_id: number) {
  const result = await prisma.admin.findFirst({
    where: {
      degree_id: degree_id,
      degree: {
        department: {
          university: {
            user_id: user_id,
          },
        },
      },
    },
  })
  return !(result == undefined)
}
export async function canMutateDegree(user_id: number, degree_id: number) {
  const result = await prisma.degree.findFirst({
    where: {
      id: degree_id,
      department: {
        university: {
          user_id: user_id,
        },
      },
    },
  })
  return !(result == undefined)
}
export async function canMutateSyllabus(user_id: number, syllabus_id: number) {
  const result = await prisma.syllabus.findFirst({
    where: {
      id: syllabus_id,
      ...adminLevelWhere,
      // degree: {
      //   admins: {
      //     some: {
      //       user_id: user_id,
      //     },
      //   },
      // },
    },
  })
  return !(result == undefined)
}
export async function canMutateCourse(user_id: number, course_id: number) {
  const result = await prisma.course.findFirst({
    where: {
      id: course_id,
      syllabus: {
        ...adminLevelWhere,
        // degree: {
        //   admins: {
        //     some: {
        //       user_id: user_id,
        //     },
        //   },
        // },
      },
    },
  })
  return !(result == undefined)
}
export async function canMutateBatch(user_id: number, batch_id: number) {
  const result = await prisma.batch.findFirst({
    where: {
      id: batch_id,
      syllabus: {
        ...adminLevelWhere,
        // degree: {
        //   admins: {
        //     some: {
        //       user_id: user_id,
        //     },
        //   },
        // },
      },
    },
  })
  return !(result == undefined)
}
export async function canMutateDivision(user_id: number, division_id: number) {
  const result = await prisma.division.findFirst({
    where: {
      id: division_id,
      batch: {
        syllabus: {
          ...adminLevelWhere,
          // degree: {
          //   admins: {
          //     some: {
          //       user_id: user_id,
          //     },
          //   },
          // },
        },
      },
    },
  })
  return !(result == undefined)
}
export async function canMutateEnrollment(user_id: number, enrollment_id: number) {
  const result = await prisma.enrollment.findFirst({
    where: {
      id: enrollment_id,
      batch: {
        syllabus: {
          ...adminLevelWhere,
          // degree: {
          //   admins: {
          //     some: {
          //       user_id: user_id,
          //     },
          //   },
          // },
        },
      },
    },
  })
  return !(result == undefined)
}
export async function canMutateTeaching(user_id: number, teaching_id: number) {
  const result = await prisma.teaching.findFirst({
    where: {
      id: teaching_id,
      batch: {
        syllabus: {
          degree: {
            admins: {
              some: {
                user_id: user_id,
              },
            },
          },
        },
      },
      division: {
        batch: {
          syllabus: {
            degree: {
              admins: {
                some: {
                  user_id: user_id,
                },
              },
            },
          },
        },
      },
    },
  })
  return !(result == undefined)
}
