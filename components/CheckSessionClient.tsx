"use client";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

export default function CheckSession({ children }: { children: ReactNode }) {
  const { data: session, status, update }: any = useSession()
  const route = usePathname()
  const nextRoute = route.split('/')[1]
  // console.log(session, status)
  
  if (status === 'loading') {
    return <div>Loading...</div>
  } else if (status === 'unauthenticated' && nextRoute == '') {
    return children
  } else if (status === 'unauthenticated' && nextRoute !== 'login') {
    redirect('/login')
  } else if (status === 'authenticated' && nextRoute === 'login') {
    redirect('/dashboards')
  } else {
    return children
  }
}
