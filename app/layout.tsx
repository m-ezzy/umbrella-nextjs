import "./styles/globals.css"
// import "@/styles/globals.css"

// import localFont from "next/font/local"
import { Inter, K2D } from "next/font/google"
import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import colors from "colors"
import { auth } from "@/lib/auth"
import Providers from "@/components/providers"
import CheckSessionServer from "@/components/auth/CheckSessionServer"
import CheckSessionClient from "@/components/auth/CheckSessionClient"
import NavBar from "@/components/header/Navbar"

export const metadata: Metadata = {
  title: "Umbrella",
  description: "University Management Application",
}

// const geistSans = localFont({
//   src: "./assets/fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// })
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// })
const k2d_font = K2D({
  subsets: ["latin"],
  weight: "200",
})

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // enabling colors in console
  colors.enable()

  // the reason why session is called so many times is that this auth() call is in the layout. right?
  const session: any = await auth()

  return (
    <html lang="en">
      <head>
        {/* getting Google Icons in the html webpage */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" />
      </head>
      <body className="h-screen"> {/* className={`${geistSans.variable} ${geistMono.variable} antialiased`} */}
        <noscript>This application requires JavaScript to run correctly</noscript>
        <div className={`${k2d_font.className} antialiased size-full`}> {/* bg-black text-white h-svh mt-0 mb-0 ml-0 mr-0 grid overflow-hidden */}
          {/* <CheckSessionServer> */}
            <SessionProvider session={session} refetchOnWindowFocus={false}>
          <Providers session={session}>
              {/* <CheckSessionClient> */}
                <NavBar />
                {children}
              {/* </CheckSessionClient> */}
          </Providers>
            </SessionProvider>
          {/* </CheckSessionServer> */}
        </div>
      </body>
    </html>
  )
}
