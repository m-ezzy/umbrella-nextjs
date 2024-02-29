"use server";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticateWithCredentials(credentials: any) {
  const result: any = await signIn('credentials', credentials)
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
