'use client'

import { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { redirect, usePathname, useRouter } from 'next/navigation'

export default function CheckSessionClient({ children }: { children: ReactNode }) {
  const { data: session, status, update }: any = useSession()
  const path = usePathname()
  const nextRoute = path.split('/')[1]

  // redirect() can be used in client component only during initial rendering. so can't use in event handlers

  if (status === 'loading') {
    return <div>Loading... check session client</div>
  }
  else if (status === 'authenticated' && (nextRoute === 'login' || nextRoute === 'signup')) {
    redirect('/dashboard')
  }
  else if (status === 'unauthenticated' &&  ['dashboard', 'settings'].includes(nextRoute)) {
    redirect('/login')
  }
  // else if (status === 'unauthenticated' && nextRoute == '') {
    // return children
  // }
  else {
    return children
  }
}
