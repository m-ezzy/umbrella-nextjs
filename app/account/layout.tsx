import { ReactNode } from "react";
import Sidebar from "@/components/UI/Sidebar";
import MenuList from "@/components/UI/MenuList";
import { auth } from "@/auth";

export default async function Layout({ children }: { children: ReactNode }) {
  const session:any = await auth();
  const menus: string[] = ["personal", "connections", "manage"];

  return (
    <main className="h-full flex">
      <Sidebar>
        <MenuList menus={menus} pathSegment="/account/" />
      </Sidebar>
      <div className="w-full overflow-auto">
        {children}
      </div>
    </main>
  );
}
