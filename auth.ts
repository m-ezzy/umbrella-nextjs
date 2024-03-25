import process from "process";
import bcrypt from "bcrypt";
import NextAuth, { Session, type NextAuthConfig, type NextAuthResult } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { queryDatabase } from "@/lib/database";
import { NextRequest } from "next/server";

const CredentialsProviderOptions: any = {
  id: "credentials", // You can specify more than one credentials provider by specifying a unique id for each one
  name: "Credentials", // The name to display on the sign in form (e.g. "Sign in with...")

  // `credentials` is used to generate a form on the sign in page.
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
    // username: { label: "Username", type: "text", placeholder: "jsmith" },
    email: { label: "Email", type: "text", placeholder: "johndoe@example.com" },
    password: { label: "Password", type: "password", placeholder: "********" },
  },

  async authorize(credentials: any) {
    // Add logic here to look up the user from the credentials supplied
    // If you return null then an error will be displayed advising the user to check their credentials
    // If you return null or false then the credentials will be rejected
    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    // Any object returned will be saved in `user` property of the JWT
    
    if(!credentials.uniqueIdentifier || !credentials.password) {
      // new NextResponse("Missing Email or Password");
      // throw new Error("Missing Email or Password");
      return null;
    }
    const user: any = await queryDatabase(
      "SELECT * FROM user WHERE (user_id = ? OR username = ? OR primary_email = ? OR contact_no = ?) AND password = ?", 
      [credentials.uniqueIdentifier, credentials.uniqueIdentifier, credentials.uniqueIdentifier, credentials.uniqueIdentifier, credentials.password]
    )
    .catch((err: any) => {
      console.log(err);
      return null;
    });
    console.log("credentials - authorize - user".bgCyan, user);
    // if(!user || !user.password) return null;
    // const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
    // if(passwordsMatch) return user;
    return user.length > 0 ? { user: {...user[0], password: null} } : null;
  },
}
const GoogleProviderOptions: any = {
  id: "google",
  name: "Google", // The name to display on the sign in form (e.g. "Sign in with...")
  // clientId: String(process.env.AUTH_GOOGLE_ID),
  // clientSecret: String(process.env.AUTH_GOOGLE_SECRET),

  async profile(profile: any) {
    // You can use the profile data to create a user in your database
    let result:any = await queryDatabase("SELECT * FROM user WHERE google_email = ?", [profile.email]);
    if(result.length > 0) return { user: {...result[0], password: null} };
    return { user: null };
  }
}
const GithubProviderOptions: any = {
  id: "github",
  name: "Github",
  // clientId: String(process.env.AUTH_GITHUB_ID),
  // clientSecret: String(process.env.AUTH_GITHUB_SECRET),
}

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
    GoogleProvider(GoogleProviderOptions),
    GithubProvider(GithubProviderOptions),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials, ...other }: any ) {
      console.log("signIn".bgCyan);
      // console.log(user, account, profile, email, credentials, other);

      // console.log("important".bgBlue);
      // console.log(user.email, account.provider, account.access_token, profile.email, profile.email_verified);

      let userCheck: any = null;

      //check the user on your database and return true if is allowed to signIn
      switch (account.provider) {
        case "credentials":
          console.log("credentials");
          return (user ? true : "User not found");
        case "google":
          // let emailCheck: boolean = profile.email_verified && profile.email.endsWith("@google.com")
          userCheck = await queryDatabase("SELECT * FROM user WHERE google_email = ?", [user.email || profile.email]);
          console.log(userCheck);
          return (userCheck.length > 0 ? true : "User is not registered with this Google ID")
        case "github":
          userCheck = await queryDatabase("SELECT * FROM user WHERE github_username = ?", [profile.username])
          console.log(userCheck);
          return (userCheck.length > 0 ? true : "User is not registered with this Github ID");
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
      console.log("jwt".bgCyan)
      // console.log(token, account, profile, user, isNewUser, trigger, other);

      // Add user to the token right after signin
      if(user) token.user = user.user;
      // Add access_token to the token right after signin
      // if(user) token.accessToken = account.accessToken;

      if (trigger === "update" && session) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token = {...token, session, a:988888888888888};
      }
      return token;
    },
    // authorize user to access the nextUrl. Return true if allowed, false if not. this is used in middleware
    async authorized({ request, auth }: { request: NextRequest, auth: Session | null }) {
      console.log("authorized".bgCyan);
      console.log(request, auth);




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
