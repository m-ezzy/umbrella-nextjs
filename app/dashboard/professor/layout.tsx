import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import prisma from "@/lib/prisma"
import { auth } from '@/lib/auth'
import { getRoleMenus, professorMenus } from '@/constants/menus'
import Sidebar from '@/components/ui/basic/Sidebar'
import MenuList from '@/components/ui/advanced/MenuList'

export default async function Layout({ children }: { children: ReactNode }) {
  const session: any = await auth()

  const faculties: any = await prisma.faculty.findMany({
    include: {
      department: {
        include: {
          university: true,
        },
      },
    },
    where: {
      user_id: session.user.id,
    },
  })
  .catch((error: any) => {
    return { error }
  })

  if(faculties.error) {
    redirect('/dashboard')
  }
  if(faculties.length == 0) return <div>You're not employed in any department yet</div>
  
  return (
    <div className="w-full h-full flex">
      <Sidebar>
        <MenuList menus={getRoleMenus("professor")} pathSegment="/dashboard/professor" pathPosition={3} />
      </Sidebar>
      <div>
        {/* FilterList */}
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
