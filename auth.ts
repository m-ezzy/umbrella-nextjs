import process from "process";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { prisma } from "./lib/db";
import NextAuth, { Session, type NextAuthConfig, type NextAuthResult } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

const CredentialsProviderOptions: any = {
  id: "credentials",
  name: "Credentials",

  async authorize(credentials: any) {
    // return null, false or throw an Error if the credentials are invalid
    // returned object will be saved in `user` property of the JWT

    if(!credentials.uniqueIdentifier || !credentials.password) {
      // new NextResponse("Missing Email or Password");
      throw new Error("Credentials Missing");
      // return null;
    }
    const result: any = await prisma.user.findFirstOrThrow({
      select: {
        id: true,
        username: true,
        email: true,
        contact_no: true,
        password: true,
        name_prefix: true,
        name_first: true,
        name_middle: true,
        name_last: true,
        profile_picture_url: true,
      },
      where: {
        username: credentials.uniqueIdentifier,
        password: credentials.password,
        // OR: [
        //   { username: credentials.uniqueIdentifier },
        //   { email: credentials.uniqueIdentifier },
        //   { contact_no: credentials.uniqueIdentifier },
        // ],
      }
    })
    .then((user: any) => {
      return { success: true, user: user };
    })
    .catch((err: any) => {
      return { error: err.message };
    });

    console.log(result);

    // if(!user || !user.password) return null;
    // const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
    // if(passwordsMatch) {
    //   delete user.password;
    //   return user;
    // }

    if(result.success) delete result.user.password;

    return (result.success ? { user: result.user } : null);
  }
}
// const GoogleProviderOptions: any = {
//   id: "google",
//   name: "Google", // The name to display on the sign in form (e.g. "Sign in with...")
//   // clientId: String(process.env.AUTH_GOOGLE_ID),
//   // clientSecret: String(process.env.AUTH_GOOGLE_SECRET),

//   async profile(profile: any) {
//     // You can use the profile data to create a user in your database
//     let result: any = await prisma.user.findUnique({ where: { google_email: profile.email } });
//     if(result.length > 0) return { user: {...result[0], password: null} };
//     return { user: null };
//   }
// }

// const GithubProviderOptions: any = {
//   id: "github",
//   name: "Github",
//   // clientId: String(process.env.AUTH_GITHUB_ID),
//   // clientSecret: String(process.env.AUTH_GITHUB_SECRET),
// }

const nextAuthOptions: NextAuthConfig = { // nextAuthOptions //authOptions
  // adapter: Mysql(),
  // basePath: process.env.AUTH_PATH,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 days
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider(CredentialsProviderOptions),
    // GoogleProvider(GoogleProviderOptions),
    // GithubProvider(GithubProviderOptions),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials, ...other }: any ) {
      // console.log("signIn".bgCyan);
      // console.log(user, account, profile, email, credentials, other);

      // console.log("important".bgBlue);
      // console.log(user.email, account.provider, account.access_token, profile.email, profile.email_verified);

      let userCheck: any = null;

      //check the user on your database and return true if is allowed to signIn
      switch (account.provider) {
        case "credentials":
          return (user ? true : "User not found");
        // case "google":
        //   // let emailCheck: boolean = profile.email_verified && profile.email.endsWith("@google.com")
        //   userCheck = await prisma.user.findUnique({ where: { google_email: user.email || profile.email } });
        //   return (userCheck.length > 0 ? true : "User is not registered with this Google ID")
        // case "github":
        //   userCheck = await queryDatabase("SELECT * FROM user WHERE github_username = ?", [profile.username])
        //   console.log(userCheck);
        //   return (userCheck.length > 0 ? true : "User is not registered with this Github ID");
      }
      return false;
    },
    // async redirect({ url, baseUrl, ...other }) {
    //   console.log("redirect".bgCyan);
    //   // console.log(url, baseUrl, other);
      
    //   return baseUrl;
    // },
    async session({ session, user, token, trigger, newSession, ...other }: any) {
      console.log("session".bgCyan);
      // console.log(session, user, token, trigger, newSession, other);

      if (trigger === "update" && newSession?.name) {
        // Make sure the updated value is reflected on the client
        return { ...session, ...newSession }
      }

      // Add user to the session every time it is accessed
      session.user = token.user;
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken

      return session
    },
    async jwt({ token, account, profile, user, isNewUser, trigger, session, ...other }: any) {
      // console.log("jwt".bgCyan)
      // console.log(token, account, profile, user, isNewUser, trigger, other);

      // Add user to the token right after signin
      if(user) token.user = user.user;
      // Add access_token to the token right after signin
      // if(user) token.accessToken = account.accessToken;

      if (trigger === "update" && session) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token = { ...token, session }
      }
      return token;
    },
    // authorize user to access the nextUrl. Return true if allowed, false if not. this is used in middleware
    async authorized({ request, auth }: { request: NextRequest, auth: Session | null }) {
      // console.log("authorized".bgCyan);
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
      return true;
    },
  },
};

const { auth, unstable_update, signIn, signOut, handlers }: NextAuthResult = NextAuth(nextAuthOptions);

export { nextAuthOptions, auth, unstable_update as update, signIn, signOut, handlers };
