import { Prisma, university } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getById(id: number) {
  const result: any = await prisma.university.findUnique({
    where: { id: id }
  })
  .then((data) => ({ data }) )
  .catch((error) => ({ error }) );
  return result;
}
export async function getManyByFounder() {
  const session: any = await auth();

  const result: any = await prisma.university.findMany({
    where: {
      user_id: session.user.id,
    },
  })
  .then((data) => ({ data }) )
  .catch((error) => ({ error }) );
  return result;
}
export async function getManyByAdmin() {
  const session: any = await auth();

  const result: any = await prisma.university.findMany({
    where: {
      departments: {
        some: {
          degrees: {
            some: {
              admins: {
                some: {
                  user_id: session.user.id,
                },
              },
            },
          },
        },
      },
    },
  })
  .then((data: university[]) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
// export async function createUniversity(data: university) {
//   const result = await prisma.university.create({ data: data })
//   .then((data) => ({ success: true, data: data }) )
//   .catch((error) => ({ error: error.message }) );
//   return result;
// }
export async function create({ data }: any) { //createUniversity //addUniversity
  const session: any = await auth();

  const result: any = await prisma.university.create({ data })
  .then((result: any) => {
    return { success: "University created successfully" }
    // return {
    //   status: "success",
    //   message: "University created successfully",
    // };
  })
  .catch((error: any) => {
    return { error: error.message }
    // return {
    //   status: "error",
    //   message: error.message,
    // };
  });
  return result;
}
export async function update(id: number, name: string, name_short: string) { //updateUniversity
}
export async function remove(id: number) { //removeById deleteById //deleteUniversity
  const result: any = await prisma.university.delete({
    where: { id: id }
  })
  .then((data) => ({ data }) )
  .catch((error) => ({ error }) );
  return result;
}
