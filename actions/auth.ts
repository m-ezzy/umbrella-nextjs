"use server";
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

export async function authenticateWithCredentials(formData: FormData) {
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
export async function authenticateWithGoogle(formData: FormData) {
  const res = await signIn('google') //('google', { callbackUrl: '/api/auth/google/callback' })
  return res;
}
export async function logout() {
  return await signOut({ redirect: true, redirectTo: '/login' });
}
