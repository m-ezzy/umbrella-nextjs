import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import MenuList from "../_components/MenuList"

export default async function Layout({ children }: { children: any }) {
  const session: any = await auth()

  // Professor - employeed in any department
  const professorEmployments: any[] = await prisma.faculty.findMany({
    include: {
      department: true,
    },
    where: {
      user_id: session.user.user_id,
    },
  })

  const menus: any = professorEmployments.map((item: any) => ({
    key: item.department_id,
    title: item.department.department_name_acronym,
    link: `/dashboard/views/waterfall/professor/${item.department_id}`,
    details: `Department: ${item.department.department_name}`,
    icon: "school",
  }));

  return (
    <>
      <MenuList menus={menus} pathPosition={4} />
      {children}
    </>
  );
}
