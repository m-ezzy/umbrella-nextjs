"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { SWRConfig, SWRConfiguration } from 'swr'
import fetcher from "@/lib/fetcher"

export default function Providers({ children, session }: { children: ReactNode, session: any }) {
  return (
    // <SessionProvider> {/* session={session}   if you don't include this, then initially it shows "loading..." content only. Why? */}
      <SWRProvider>
        {children}
      </SWRProvider>
    // </SessionProvider>
  )
}
export const SWRProvider = ({ children }: any) => {
  let config: SWRConfiguration = {
    fetcher: fetcher,
  }
  return (
    <SWRConfig value={config}>
      {children}
    </SWRConfig>
  )
}
