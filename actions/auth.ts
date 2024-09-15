"use server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { AuthError } from 'next-auth'
import { signIn, signOut } from '@/auth'

async function authenticateWithCredentials(previousState: any, formData: FormData) {
  const uniqueIdentifier = formData.get('uniqueIdentifier')
  const password = formData.get('password')

  const result: any = await signIn('credentials', { uniqueIdentifier: uniqueIdentifier, password: password }) //, redirect: true, redirectTo: '/dashboard'})
  .catch((error: AuthError) => {
    console.log("auth error".bgRed, error.message);
    return { error: error.type }
  })

  if(result.error) {
    return result;
  } else {
    revalidatePath("/");
    redirect("/dashboard");
  }
}
async function authenticateWithGoogle(formData: FormData) {
  const result = await signIn('google') //('google', { callbackUrl: '/api/auth/google/callback' })
  .catch((error: AuthError) => {
    return { error: error.message }
  })
  return result
}
async function logout() {
  return await signOut({ redirect: true, redirectTo: '/login' })
}
async function userLogout(formData: FormData) {
  await signOut({
    redirect: true,
    redirectTo: '/login',
  })
  revalidatePath("/")
  // redirect("/login")
}

export { authenticateWithCredentials, authenticateWithGoogle, logout, userLogout }
