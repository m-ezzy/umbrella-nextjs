'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { adminSchema } from '@/lib/data-schemas-zod'
import { canMutateAdmin } from '@/lib/data-access-checking'

export async function createAdmin(previousState: any, formData: FormData) {
  const session: any = await auth()
  const params: any = Object.fromEntries(formData.entries())

  //hasPermission //isAuthorized //isAllowed //canMutate
  let isAllowed: boolean = await canMutateAdmin(session.user.id, params.degree_id)
  if (!isAllowed) return { error: "Unauthorized" }

  const result: any = await prisma.admin.create({
    data: {
      degree_id: Number(params.degree_id),
      user_id: Number(params.user_id),
    }
  })
  .then((data) => {
    revalidatePath("/dashboard")
    return { data }
  })
  .catch((error) => ({ error: error.message }) )

  return result
}
export async function deleteAdmin(previousState: any, formData: FormData) {
  const session: any = await auth()
  const params: any = Object.fromEntries(formData.entries())

  let isAllowed: boolean = await canMutateAdmin(session.user.id, params.degree_id)
  if (!isAllowed) return { error: "Unauthorized" }

  const result: any = await prisma.admin.delete({
    where: {
      degree_id_user_id: {
        degree_id: Number(formData.get("degree_id")),
        user_id: Number(formData.get("user_id")),
      },
    },
  })
  .then((data) => {
    revalidatePath("/dashboard")
    return { data }
  })
  .catch((error) => ({ error }) )

  return result
}
