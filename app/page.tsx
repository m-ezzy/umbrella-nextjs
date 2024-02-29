"use client"
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import DashboardSelector from '../components/DashboardSelector'

export default function App() {
  // const session = auth();
  const { data: session, status, update }: any = useSession()
  // console.log(session, status, update)

  if (status === 'loading') {
    return <p>Loading...</p>
  } else if (status === 'unauthenticated') {
    redirect('/login')
  } else if (status === 'authenticated') {
    return <DashboardSelector />
  }
}
