"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

async function authenticateWithCredentials(formData: FormData) {
  const uniqueIdentifier = formData.get('uniqueIdentifier');
  const password = formData.get('password');

  const result: any = await signIn('credentials', { uniqueIdentifier: uniqueIdentifier, password: password, redirect: true, redirectTo: '/dashboard'})
  return result;
  // .catch((error: AuthError) => {
  //   switch (error.type) {
  //     case 'CredentialsSignin':
  //       return { error: 'Invalid credentials' }
  //     default:
  //       return { error: 'Something went wrong' }
  //   }
  // });
  // return { success: result };
}
async function authenticateWithGoogle(formData: FormData) {
  const res = await signIn('google') //('google', { callbackUrl: '/api/auth/google/callback' })
  return res;
}
async function logout() {
  return await signOut({ redirect: true, redirectTo: '/login' });
}
async function userLogout(formData: FormData) {
  await signOut();
  revalidatePath("/");
  redirect("/login");
}

export { authenticateWithCredentials, authenticateWithGoogle, logout, userLogout }
