import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "user" | "admin";
};

// Declare your framework library
declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {}
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      id: number
      username?: string
      email?: string
      contact_no?: string
      name_prefix?: string
      name_first?: string
      name_middle?: string
      name_last?: string
      profile_picture_url?: string
    },
    expires: string
  }
}
declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
  }
}
// We recommend doing your own environment variable validation
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      AUTH_PATH: string
      AUTH_SECRET: string
      // AUTH_GOOGLE_ID: string
      // AUTH_GOOGLE_SECRET: string
      // UNIVERSITY_NAME: string
		}
	}
}
