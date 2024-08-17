import { ReactNode } from "react";
import Sidebar from "@/components/ui/Sidebar";
import MenuList from "@/components/ui/MenuList";
import { auth } from "@/auth";

export default async function Layout({ children }: { children: ReactNode }) {
  const session:any = await auth();
  // const menus: string[] = ["profile", "privacy", "security"];
  const menus: any = [
    {
      key: "account",
      title: "Account",
      link: "/settings/account",
      icon: "person",
    },
    {
      key: "profile",
      title: "Profile",
      link: "/settings/profile",
      icon: "person",
    },
    {
      key: "privacy",
      title: "Privacy",
      link: "/settings/privacy",
      icon: "privacy",
    },
    {
      key: "security",
      title: "Security",
      link: "/settings/security",
      icon: "security",
    },
    {
      key: "notifications",
      title: "Notifications",
      link: "/settings/notifications",
      icon: "notifications",
    },
  ];
  return (
    <main className="h-full flex">
      {/* <Sidebar> */}
        <MenuList menus={menus} pathSegment="/account/" />
      {/* </Sidebar> */}
      <div className="w-full overflow-auto">
        {children}
      </div>
    </main>
  );
}
