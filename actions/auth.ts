'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { AuthError } from 'next-auth'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { signIn, signOut } from '@/lib/auth'

export async function signupWithCredentials(previousState: any, formData: FormData) {
  const name_first = formData.get('name_first') as string
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  // hashing the provided password for security
  const hashedPassword = await bcrypt.hash(password, 10)

  const result: any = await prisma.user.create({
    data: {
      name_first: name_first,
      username: username,
      password: password,
    }
  })
  .then((user: any) => ({ success: true, user }) )
  .catch((error: any) => ({ error: error.message }) )

  // redirect("/login")
  return result
}
export async function authenticateWithCredentials(previousState: any, formData: FormData) { //loginWithCredentials
  const uniqueIdentifier = formData.get('uniqueIdentifier')
  const password = formData.get('password')

  const result: any = await signIn('credentials', { uniqueIdentifier: uniqueIdentifier, password: password }) //, redirect: true, redirectTo: '/dashboard'})
  .catch((error: AuthError) => {
    console.log("AUTH signIn error".bgRed, error)
    return { error: error.type }
  })
  if(result.error) {
    return result
  } else {
    revalidatePath("/")
    redirect("/dashboard")
  }
}
export async function authenticateWithGoogle(previousState: any, formData: FormData) {
  const result = await signIn('google') //('google', { callbackUrl: '/api/auth/google/callback' })
  .then((data: any) => ({ data }) )
  .catch((error: AuthError) => ({ error }) )
  return result
}
export async function logout(formData: FormData) {
  let result = await signOut({ redirect: true, redirectTo: '/login' })
  .catch((error) => ({ error }) )

  // if(result.error) return result
  revalidatePath("/")
  redirect("/login")
}
export async function revokeAuthSession(formData: FormData) {
}
