import { Prisma, batch } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getById(id: number) {
  const result: any = await prisma.batch.findUniqueOrThrow({
    where: { id: id }
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
export async function getBySyllabusId(syllabus_id: number) {
  const result: any = await prisma.batch.findMany({
    where: {
      syllabus_id: syllabus_id,
    }
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
export async function create(start_year: number, finish_year: number, current_semester: number, syllabus_id: number) {
  let result: any = await prisma.batch.create({
    data: {
      start_year: start_year,
      finish_year: finish_year,
      current_semester: current_semester,
      syllabus_id: syllabus_id,
    }
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
export async function update({ id, current_semester }: { id: number, current_semester: number }) { // Prisma.BatchUpdateInput
  const result: any = await prisma.batch.update({
    data: {
      current_semester: current_semester,
    },
    where: { id: id },
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
export async function remove(id: number) {
  const result: any = await prisma.batch.delete({
    where: { id: id }
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
