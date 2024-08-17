import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import MenuList from '../../../components/ui/MenuList3'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export default async function Layout({ children, params }: { children: ReactNode, params: any }) {
  const session:any = await auth()

  const adminDegrees: any[] = await prisma.admin.findMany({
    select: {
      admin_id: true,
      degree: {
        select: {
          degree_id: true,
          degree_name: true,
          degree_name_acronym: true,
        },
      },
    },
    where: {
      user_id: session.user.id,
    },
  })
  if(adminDegrees.length == 0) {
    redirect('/dashboard')
  }

  const menus: any = adminDegrees.map((degree: any) => {
    return {
      key: degree.degree.degree_id,
      title: degree.degree.degree_name_acronym,
      link: `/dashboard/views/stack/admin/${degree.degree.degree_id}`,
      icon: 'workspace_premium',
    }
  })
  return (
    <>
      <MenuList menus={menus} pathPosition={5} />
      {children}
    </>
  )
}
