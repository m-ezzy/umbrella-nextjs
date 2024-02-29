import process from "process";
import bcrypt from "bcrypt";
import NextAuth, { type NextAuthConfig, type NextAuthResult } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { queryDatabase } from "@/lib/database";

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
      "SELECT * FROM users WHERE (id = ? OR username = ? OR primary_email = ? OR mobile = ?) AND password = ?", 
      [credentials.uniqueIdentifier, credentials.uniqueIdentifier, credentials.uniqueIdentifier, credentials.uniqueIdentifier, credentials.password]
    )
    .catch((err: any) => {
      console.log(err);
      return null;
    });
    console.log(user);
    // if(!user || !user.password) return null;
    // const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
    // if(passwordsMatch) return user;
    return user.length > 0 ? { ...user[0], password: null } : null;
  },
}
const GoogleProviderOptions: any = {
  id: "google",
  name: "Google", // The name to display on the sign in form (e.g. "Sign in with...")
  clientId: String(process.env.AUTH_GOOGLE_ID),
  clientSecret: String(process.env.AUTH_GOOGLE_SECRET),
}
const GithubProviderOptions: any = {
  id: "github",
  name: "Github",
  clientId: String(process.env.AUTH_GITHUB_ID),
  clientSecret: String(process.env.AUTH_GITHUB_SECRET),
}

const providers: any = [
  CredentialsProvider(CredentialsProviderOptions),
  GoogleProvider(GoogleProviderOptions),
  GithubProvider(GithubProviderOptions),
]

const nextAuthOptions: NextAuthConfig = ({ // nextAuthOptions //authOptions
  // adapter: Mysql(),
  // basePath: process.env.AUTH_PATH,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // jwt: {
  //   secret: process.env.SECRET,
  // },
  pages: {
    signIn: '/login',
  },
  providers: providers,
  callbacks: {
    async signIn({ user, account, profile, email, credentials, ...other }: any ) {
      // console.log("user", user);
      // {
      //   id: '100370553291476971055',
      //   name: 'C21_Murtaza Ezzy',
      //   email: 'murtazaezzy1001@gmail.com',
      //   image: 'https://lh3.googleusercontent.com/a/ACg8ocIuxzQ4hli7hw9TyW3Npujo9YCVS3j8k9ouvdcvaIRL8jE=s96-c'
      // }
      // console.log("account", account);
      // {
      //   provider: 'google',
      //   type: 'oauth',
      //   providerAccountId: '100370553291476971055',
      //   access_token: 'ya29.a0AfB_byDUnfryqF092lbDkWzHN92YwbSC5CTVDujuoPVyp0ABx9356DSFubfFQwmGo0ECiAj7TkKypsPIGkv8qLujfMAgvq5FiyzV0XFDOkztiSVmNT_q63DSoWWW-LiqzStKq0ui2pBJHigVKidz1q2eCAci9IzQdAaCgYKAVQSARISFQHGX2MiIlBuWqIUbULUUbW3BUlZ-A0169',
      //   expires_at: 1708702571,
      //   scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      //   token_type: 'Bearer',
      //   id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1YzE4OGE4MzU0NmZjMTg4ZTUxNTc2YmE3MjgzNmUwNjAwZThiNzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyODIzMzE0Njk4MTAtdm43M2h1M2UzZDQ1ZGdhZGs1Z2E1c3R2cDBrbnFjY3QuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyODIzMzE0Njk4MTAtdm43M2h1M2UzZDQ1ZGdhZGs1Z2E1c3R2cDBrbnFjY3QuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDAzNzA1NTMyOTE0NzY5NzEwNTUiLCJlbWFpbCI6Im11cnRhemFlenp5MTAwMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ii1HV2phTm5YV3Z0TjhhSFpXZl9OcFEiLCJuYW1lIjoiQzIxX011cnRhemEgRXp6eSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJdXh6UTRobGk3aHc5VHlXM05wdWpvOVlDVlMzajhrOW91dmRjdmFJUkw4akU9czk2LWMiLCJnaXZlbl9uYW1lIjoiQzIxX011cnRhemEiLCJmYW1pbHlfbmFtZSI6IkV6enkiLCJsb2NhbGUiOiJlbi1HQiIsImlhdCI6MTcwODY5ODk3MywiZXhwIjoxNzA4NzAyNTczfQ.BI4wu8eRqTFZLPoA898Bw-RC13jNIWjVv5W9NvydhkUO_r8pjm-40Tqulh5PkzNcplBcWl1mTg4RIixvAhYqi8kX0hKP-TgaCsw6wB2OgYK1G9Uhc_lcgJTyXuw9yHfsG6lssED7KA4x5uIwgsQl_LBvronICW_zax8Rtw4TIL6W0gpMuu6ib2vRL5lzSgNstwsKFLSIk4Lg7Ii4nDyenW6ZeaPfU02WLVflC4ogxWbr1hi3n-eKB0gWVbnEUbvpPGm8wIA-VNJxaXsyvryT58LPVXdAEULRhw34uXREPu1KLa5GyDK54NVnr4jUOOkVdLFyQOIj6vu28vxyde3WXA'
      // }
      // console.log("profile", profile);
      // profile {
      //   iss: 'https://accounts.google.com',
      //   azp: '282331469810-vn73hu3e3d45dgadk5ga5stvp0knqcct.apps.googleusercontent.com',
      //   aud: '282331469810-vn73hu3e3d45dgadk5ga5stvp0knqcct.apps.googleusercontent.com',
      //   sub: '100370553291476971055',
      //   email: 'murtazaezzy1001@gmail.com',
      //   email_verified: true,
      //   at_hash: '-GWjaNnXWvtN8aHZWf_NpQ',
      //   name: 'C21_Murtaza Ezzy',
      //   picture: 'https://lh3.googleusercontent.com/a/ACg8ocIuxzQ4hli7hw9TyW3Npujo9YCVS3j8k9ouvdcvaIRL8jE=s96-c',
      //   given_name: 'C21_Murtaza',
      //   family_name: 'Ezzy',
      //   locale: 'en-GB',
      //   iat: 1708698973,
      //   exp: 1708702573
      // }
      // console.log("email", email);
      // console.log("credentials", credentials);
      // console.log("other", other);

      let userCheck: any = null;

      //check the user on your database and return true if is allowed to signIn
      switch (account.provider) {
        case "credentials":
          console.log("credentials");
          return (user ? true : "User not found");
        case "google":
          // let emailCheck: boolean = profile.email_verified && profile.email.endsWith("@google.com")
          userCheck = await queryDatabase("SELECT * FROM users WHERE google_email = ?", [user.email || profile.email]);
          console.log(userCheck);
          return (userCheck.length > 0 ? true : "User is not registered with this Google ID")
        case "github":
          userCheck = await queryDatabase("SELECT * FROM users WHERE github_username = ?", [profile.username])
          console.log(userCheck);
          return (userCheck.length > 0 ? true : "User is not registered with this Github ID");
      }
      return "no provider matched";
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    // Note, that `rest.session` can be any arbitrary object, remember to validate it!
    async session({ session, token, trigger, newSession }: any) {
      console.log("session", session);
      console.log("token", token);
      // console.log("trigger", trigger);
      // console.log("newSession", newSession);

      if (trigger === "update" && newSession?.name) {
        // Make sure the updated value is reflected on the client
        session.name = newSession.name
        
        // You can update the session in the database if it's not already updated.
        // await prismaAdapter.updateUser(session.user.id, { name: newSession.name })
      }
      
      session.user = token.user;
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken
      return session
    },
    async jwt({ token, account, user, profile }: any) {
      // Persist the OAuth access_token to the token right after signin
      // if (account) {
      //   token.accessToken = account.access_token;
      // }
      if (user) {
        token.user = user;
        token.user_id = user.id
      }
      return token;
    },
    // authorize user to access the nextUrl. Return true if allowed, false if not. this is used in middleware
    authorized({ auth, request: { nextUrl } }) {
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
});

const { auth, signIn, signOut, handlers }: NextAuthResult = NextAuth(nextAuthOptions);

export { nextAuthOptions, auth, signIn, signOut, handlers };
