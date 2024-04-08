import Link from "next/link"
import BreadcrumbBar from "@/components/UI/BreadcrumbBar"
import MenuList from "./_components/MenuList"
import { prisma } from "@/lib/db"
import { auth, update } from "@/auth"

export default async function Layout({ children }: { children: any }) {
  const allMenus: any = [
    {
      key: "manager", // director
      title: "Manager",
      link: "/dashboard/views/stack/manager",
      icon: "person",
    },
    {
      key: "head",
      title: "Head",
      link: "/dashboard/views/stack/head",
      icon: "person",
    },
    {
      key: "admin",
      title: "Admin",
      link: "/dashboard/views/stack/admin",
      icon: "person",
    },
    {
      key: "professor",
      title: "Professor",
      link: "/dashboard/views/stack/professor",
      icon: "person",
    },
    {
      key: "student",
      title: "Student",
      link: "/dashboard/views/stack/student",
      icon: "person",
    },
  ];

  const session:any = await auth()

  const managerUniversity: any[] = await prisma.university_manager.findMany({
    where: {
      user_id: session.user_user_id,
    },
  })
  const headDepartments: any[] = await prisma.faculty.findMany({
    where: {
      user_id: session.user.user_id,
      designation: "head",
    },
  })
  const adminDegrees: any[] = await prisma.admin.findMany({
    where: {
      user_id: session.user.user_id,
    },
  })
  const professorEmployments: any[] = await prisma.faculty.findMany({
    where: {
      user_id: session.user.user_id,
      designation: {
        in: ["assistant_professor", "associate_professor"],
      },
    },
  })
  const studentEnrollments: any[] = await prisma.enrollment.findMany({
    where: {
      user_id: session.user.user_id,
    },
  })

  const menus: any = []
  if(managerUniversity.length > 0) {
    menus.push(allMenus[0])
  }
  if(headDepartments.length > 0) {
    menus.push(allMenus[1])
  }
  if(adminDegrees.length > 0) {
    menus.push(allMenus[2])
  }
  if(professorEmployments.length > 0) {
    menus.push(allMenus[3])
  }
  if(studentEnrollments.length > 0) {
    menus.push(allMenus[4])
  }

  const breadcrumbs: any = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Stack",
      path: "/dashboard/views/stack",
    },
  ]
  return (
    <div className="bg-zinc-600 w-full h-full p-2 gri grid-cols-auto gap-2 space-y-2">
      <BreadcrumbBar breadcrumbs={breadcrumbs} />
      <MenuList menus={menus} pathPosition={4} />
      {children}
    </div>
  );
}
