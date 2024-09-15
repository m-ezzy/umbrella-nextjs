import { prisma } from "@/lib/db";

export async function addUser({ name_first, email, password }: any) {
  let user = await prisma.user.create({
    data: {
      name_first: name_first,
      primary_email: email,
      password: password,
    },
  });
}
