import { ReactNode } from "react";
import Sidebar from "@/components/ui/Sidebar";
import MenuList from "@/components/ui/MenuList";
import { auth } from "@/auth";

export default async function Layout({ children }: { children: ReactNode }) {
  const session:any = await auth();
  // const menus: string[] = ["profile", "privacy", "security"];
  const menus: any = [
    {
      name: "Account",
      href: "/account",
      icon: "person",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: "person",
    },
    {
      name: "Privacy",
      href: "/privacy",
      icon: "privacy",
    },
    {
      name: "Security",
      href: "/security",
      icon: "security",
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: "notifications",
    },
  ];
  return (
    <main className="h-full flex">
      {/* <Sidebar> */}
        <MenuList menus={menus} pathSegment="/settings" pathPosition={2} />
      {/* </Sidebar> */}
      <div className="w-full overflow-auto">
        {children}
      </div>
    </main>
  );
}
