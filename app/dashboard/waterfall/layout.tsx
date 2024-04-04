import MenuList from "./_components/MenuList";

export default async function Layout({ children }: { children: any }) {
  const menus: any = [
    {
      key: "student",
      title: "Student",
      link: "/dashboard/waterfall/student",
      icon: "person",
    },
    {
      key: "professor",
      title: "Professor",
      link: "/dashboard/waterfall/professor",
      icon: "person",
    },
    {
      key: "admin",
      title: "Admin",
      link: "/dashboard/waterfall/admin",
      icon: "person",
    },
    {
      key: "head",
      title: "Head",
      link: "/dashboard/waterfall/head",
      icon: "person",
    },
    {
      key: "director",
      title: "Director",
      link: "/dashboard/waterfall/director",
      icon: "person",
    },
  ];
  return (
    <>
      <MenuList menus={menus} pathPosition={3} />
      {children}
    </>
  );
}
