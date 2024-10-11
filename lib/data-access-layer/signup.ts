import prisma from "@/lib/prisma";

export async function addUser({ name_first, email, password }: any) {
  let user = await prisma.user.create({
    data: {
      name_first: name_first,
      email: email,
      password: password,
    },
  });
}
