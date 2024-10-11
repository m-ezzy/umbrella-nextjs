import { Prisma, course, course_category, course_type } from "@prisma/client"
import prisma from "@/lib/prisma"

export async function getById(id: number) {
  const result: any = await prisma.course.findUniqueOrThrow({
    where: { id: id }
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
export async function getBySyllabusId(syllabus_id: number) {
  const result: any = await prisma.course.findMany({
    where: {
      syllabus_id: syllabus_id,
    }
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
export async function create({
  code, name, name_short, type, category, credits, semester, syllabus_id
}: {
  code: string, name: string, name_short: string, type: course_type, category: course_category, credits: number, semester: number, syllabus_id: number
}) {
  // let valid1 = type typeof course_type;
  // let valid2 category as course_category,

  const result = await prisma.course.create({
    data: {
      code: code,
      name: name,
      name_short: name_short,
      type: type,
      category: category,
      credits: credits,
      semester: semester,
      syllabus_id: syllabus_id,
    }
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
export async function update(data: any) {
}
export async function remove(id: number) {
  const result: any = await prisma.course.delete({
    where: { id: id }
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return result;
}
