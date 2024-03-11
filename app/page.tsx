// "use client"
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { auth } from '@/auth'
import DashboardSelector from '../components/DashboardSelector'

export default async function App() {
  const session: any = await auth();
  // console.log("session".bgCyan, session);
  if(session?.user == null) {
    redirect('/login')
  } else if(session.user) {
    return <DashboardSelector />
  }

  // const { data: session, status, update }: any = useSession()
  // console.log(session, status, update, "99999999999999999999999999999999999999999999999999999999999999999".bgCyan)
  // if (status === 'loading') {
  //   return <p>Loading...</p>
  // } else if (status === 'unauthenticated') {
  //   redirect('/login')
  // } else if (status === 'authenticated') {
  //   return <DashboardSelector />
  // }

  // return (
  //   <div>
  //     <DashboardSelector />
  //   </div>
  // )
}
