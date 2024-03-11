"use server";
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

export async function authenticateWithCredentials(credentials: any) {
  const result: any = await signIn('credentials', {...credentials, redirect:true, redirectTo: '/'})
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
export async function authenticateWithGoogle() {
  const res = await signIn('google') //('google', { callbackUrl: '/api/auth/google/callback' })
  return res;
}
export async function logout() {
  return await signOut({ redirect: true, redirectTo: '/login' });
}
