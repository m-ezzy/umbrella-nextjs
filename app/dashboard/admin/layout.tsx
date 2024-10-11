import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import prisma from "@/lib/prisma"
import { auth } from '@/lib/auth'
import { adminMenus } from '@/constants/menus'
import MenuList from '@/components/ui/advanced/MenuList'
import AdminFilters from '@/components/filters/AdminFilters'
import { AdminContextProvider } from '@/contexts/AdminContext'
import AdminLayout from '@/components/layouts/AdminLayout'

export default async function Layout({ children }: { children: ReactNode }) {
  const session:any = await auth()
  
  const result: any = await prisma.university.findMany({
    where: {
      departments: {
        some: {
          degrees: {
            some: {
              admins: {
                some: {
                  user_id: session.user.id,
                },
              },
            },
          },
        },
      },
    },
  })
  .then((universities: any[]) => ({ universities }) )
  .catch((error: any) => ({ error }) )

  const degrees: any[] = await prisma.degree.findMany({
    where: {
      admins: {
        some: {
          user_id: session.user.id,
        },
      },
    },
  })
  const admins: any[] = await prisma.admin.findMany({
    select: {
      degree: {
        select: {
          id: true,
          name: true,
          name_short: true,
          type: true,
          department: {
            select: {
              id: true,
              name: true,
              name_short: true,
              university: {
                select: {
                  id: true,
                  name: true,
                  name_short: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      user_id: session.user.id,
    },
  })
  
  if(admins.length == 0) {
    return <div>You're not admin of any degree yet</div>
  }

  // let dataset: any[] = admins.map((admin: any) => ({
  //   university_id: admin.degree.department.university.id,
  //   university_name: admin.degree.department.university.name,
  //   university_name_short: admin.degree.department.university.name_short,
  //   department_id: admin.degree.department.id,
  //   department_name: admin.degree.department.name,
  //   department_name_short: admin.degree.department.name_short,
  //   degree_id: admin.degree.id,
  //   degree_name: admin.degree.name,
  //   degree_name_short: admin.degree.name_short,
  // }))

  // let filters: any = [
  //   {
  //     name: "University",
  //     name_field: "university_name",
  //     value_field: "university_id",
  //   },
  //   {
  //     name: "Department",
  //     name_field: "department_name",
  //     value_field: "department_id",
  //   },
  //   {
  //     name: "Degree",
  //     name_field: "degree_name",
  //     value_field: "degree_id",
  //   },
  // ]
  return (
    <AdminContextProvider>
      <AdminLayout initialData={{ universities: result.universities, admins: admins, degrees: degrees }}>
        {children}
      </AdminLayout>
    </AdminContextProvider>
  )
}
