import zod from 'zod';
import { assignment } from '@prisma/client';

export const validateUniversity = (data: any) => {
  const universitySchema = zod.object({
    id: zod.number(),
    name: zod.string(),
    name_short: zod.string(),
  })
  return universitySchema.safeParse(data).success
}
export const assignmentValidation = (data: any) => {
  // return data instanceof assignment

  const assignmentSchema = zod.object({
    id: zod.number(),
    title: zod.string(),
    description: zod.string(),
    dueDate: zod.date(),
    status: zod.string(),
  })
  return assignmentSchema.safeParse(data).success
}
