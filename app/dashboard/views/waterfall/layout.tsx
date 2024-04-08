import MenuList from "./_components/MenuList"

export default async function Layout({ children }: { children: any }) {
  const menus: any = [
    {
      key: "student",
      title: "Student",
      link: "/dashboard/views/waterfall/student",
      icon: "person",
    },
    {
      key: "professor",
      title: "Professor",
      link: "/dashboard/views/waterfall/professor",
      icon: "person",
    },
    {
      key: "admin",
      title: "Admin",
      link: "/dashboard/views/waterfall/admin",
      icon: "person",
    },
    {
      key: "head",
      title: "Head",
      link: "/dashboard/views/waterfall/head",
      icon: "person",
    },
    {
      key: "director",
      title: "Director",
      link: "/dashboard/views/waterfall/director",
      icon: "person",
    },
  ]

  return (
    <div className="p-2 flex flex-wrap gap-2"> {/*   */}
      <MenuList menus={menus} pathPosition={3} />
      {children}
    </div>
  )
}
