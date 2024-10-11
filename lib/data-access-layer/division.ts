import { Prisma, division } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getById(id: number) {
  const result: any = await prisma.division.findUniqueOrThrow({
    where: { id: id }
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
export async function getByBatchId(batch_id: number) {
  const result: any = await prisma.division.findMany({
    where: {
      batch_id: batch_id,
    }
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
export async function create({ name, batch_id }: { name: string, batch_id: number }) {
  const result: any = await prisma.division.create({
    data: {
      name: name,
      batch_id: batch_id,
      // course_id: course_id,
    },
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
export async function update({ id, name }: { id: number, name: string}) {
  const result: any = await prisma.division.update({
    data: {
      name: name,
    },
    where: { id: id },
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
export async function remove(id: number) {
  const result: any = await prisma.division.delete({
    where: { id: id },
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
