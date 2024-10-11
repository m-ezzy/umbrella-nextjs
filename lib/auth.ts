// import process from "process"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import { redirect } from "next/navigation"
import NextAuth, { Session, type NextAuthConfig, type NextAuthResult } from 'next-auth'
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import GithubProvider, { GitHubProfile } from "next-auth/providers/github"
import zod from "zod"
import prisma from "@/lib/prisma"

const CredentialsProviderOptions: any = {
  id: "credentials",
  name: "Credentials",

  // returned object will be saved in `user` property of the JWT
  async authorize(credentials: any) {
    if(!credentials.uniqueIdentifier || !credentials.password) {
      return null // false
    }

    const result: any = await prisma.user.findFirstOrThrow({
      select: {
        id: true,
        password: true,
      },
      where: {
        OR: [
          {
            username: credentials.uniqueIdentifier,
          },
          {
            email: credentials.uniqueIdentifier,
          },
          {
            contact_no: credentials.uniqueIdentifier,
          },
        ],
        password: credentials.password,
      }
    })
    .then((data: any) => {
      return { user: data }
    })
    .catch((error) => {
      return { error }
    })

    console.log("AUTH authorize".bgWhite, result)

    // comparing the provided password with the hashed password in the database
    // const passwordsMatch = await bcrypt.compare(credentials.password, user.password)

    if(result.error) return null
    return { user: { id: result.user.id } }
  }
}
const GoogleProviderOptions: any = {
  id: "google",
  name: "Google", // The name to display on the sign in form (e.g. "Sign in with...")
  // clientId: String(process.env.AUTH_GOOGLE_ID),
  // clientSecret: String(process.env.AUTH_GOOGLE_SECRET),

  async profile(profile: any) {
    // You can use the profile data to create a user in your database
    let result: any = await prisma.user.findUnique({ where: { email: profile.email } });
    if(result.length > 0) return { user: { id: result.user.id } };
    return null;
  },
}
const nextAuthOptions: NextAuthConfig = { // nextAuthOptions //authOptions
  // adapter: Mysql(),
  // basePath: process.env.AUTH_PATH,
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 days
  },
  // pages: {
  //   signIn: '/login',
  //   newUser: '/signup',
  // },
  providers: [
    CredentialsProvider(CredentialsProviderOptions),
    GoogleProvider(GoogleProviderOptions),
  ],
  callbacks: {
    async signIn({ credentials, email, account, profile, user, ...other }: any ) {
      // console.log("AUTH signIn".bgWhite, user, account, credentials, email, profile, other)
      
      let allowed: boolean = false;

      switch (account.provider) {
        case "credentials": {
          allowed = user ? true : false;
          break;
        }
        case "google": {
          let result = await prisma.user.findUnique({
            where: {
              id: user.id,
              email: profile.email,
            }
          });
          allowed = result ? true : false;
          break;
        }
      }
      
      return allowed;
    },
    // async redirect({ url, baseUrl, ...other }) {
    //   console.log("AUTH redirect".bgWhite, url, baseUrl, other);
    //   return baseUrl;
    // },
    async session({ session, user, token, trigger, newSession, ...other }: any) {
      // console.log("AUTH session".bgWhite, session, user, token, trigger, newSession, other)

      // Make sure the updated value is reflected on the client
      if (trigger === "update" && newSession?.name) {
        return { ...session, ...newSession }
      }

      // Add user to the session every time it is accessed
      session.user = token.user

      // Send properties to the client, like an access_token from a provider
      // session.accessToken = token.accessToken

      session.error = token.error

      return session
    },
    async jwt({ token, account, profile, user, isNewUser, trigger, session, ...other }: any) {
      // console.log("AUTH jwt".bgWhite, token, account, profile, user, isNewUser, trigger, other)

      // Add user to the token right after signin
      if(user) token.user = user.user

      // Add access_token to the token right after signin
      // if(user) token.accessToken = account.accessToken

      // Note, that `session` can be any arbitrary object, remember to validate it!
      if (trigger === "update" && session) {
        token = { ...token, session }
      }
      
      return token
    },
    // authorize user to access the nextUrl. Return true if allowed, false if not. this is used in middleware
    async authorized({ request, auth }: { request: NextRequest, auth: Session | null }) {
      // console.log(request, auth);




      // authorized: ({ token }) => token?.role === "admin",
      // if(token) return true





      // const url = request.nextUrl

      // if(request.method === "POST") {
      //   const { authToken } = (await request.json()) ?? {}
      //   // If the request has a valid auth token, it is authorized
      //   const valid = await validateAuthToken(authToken)
      //   if(valid) return true
      //   return NextResponse.json("Invalid auth token", { status: 401 })
      // }

      // Logged in users are authenticated, otherwise redirect to login page
      // return !!auth.user





      // const user = auth?.user;

      // const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      // const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      // const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

      // if (isOnAdminPanel && !user?.isAdmin) {
      //   return false;
      // }

      // // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

      // if (isOnBlogPage && !user) {
      //   return false;
      // }

      // // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

      // if (isOnLoginPage && user) {
      //   return Response.redirect(new URL("/", request.nextUrl));
      // }

      // return true





      // const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true
    },
  },
}

const { auth, unstable_update, signIn, signOut, handlers }: NextAuthResult = NextAuth(nextAuthOptions)

export { nextAuthOptions, auth, unstable_update as update, signIn, signOut, handlers }
