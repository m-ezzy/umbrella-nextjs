import Link from "next/link"
import { redirect } from "next/navigation"
import { Session } from "next-auth"
import prisma from "@/lib/prisma"
import { auth, update } from "@/lib/auth"
import { StudentContextProvider } from "@/contexts/StudentContext"
import StudentLayout from "@/components/layouts/StudentLayout"
import Sidebar from "@/components/ui/basic/Sidebar"
import MenuList from "@/components/ui/advanced/MenuList"
import RoleLayout from "@/components/layouts/RoleLayout"
import StudentFilters from "@/components/filters/StudentFilters"

export default async function Layout({ children }: { children: any }) {
  const session: any = await auth()

  const data: any = await prisma.enrollment.findMany({
    where: {
      user_id: session.user.id,
    },
    include: {
      division: true,
      batch: {
        include: {
          syllabus: {
            include: {
              courses: true,
              degree: {
                include: {
                  department: {
                    include: {
                      university: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  if(data.length == 0) {
    // redirect("/dashboard");
    return <div>You're not enrolled in any degree yet</div>
  }
  let dataset = data.map((enrollment: any) => {
    return {
      enrollment_id: enrollment.id,
      university_id: enrollment.batch.syllabus.degree.department.university.id,
      university_name: enrollment.batch.syllabus.degree.department.university.name,
      department_id: enrollment.batch.syllabus.degree.department.id,
      department_name: enrollment.batch.syllabus.degree.department.name,
      degree_id: enrollment.batch.syllabus.degree.id,
      degree_name: enrollment.batch.syllabus.degree.name,
      syllabus_id: enrollment.batch.syllabus.id,
      year_effective: enrollment.batch.syllabus.year_effective,
      batch_id: enrollment.batch.id,
      start_year: enrollment.batch.start_year,
      division_id: enrollment.division.id,
      division_name: enrollment.division.name,
    }
  })
  return (
    <StudentContextProvider>
      {/* <RoleLayout role="student" filterComponent={StudentFilters}> */}
      <StudentLayout data={data} dataset={dataset}>
        {children}
      </StudentLayout>
      {/* </RoleLayout> */}
    </StudentContextProvider>
  )
}
