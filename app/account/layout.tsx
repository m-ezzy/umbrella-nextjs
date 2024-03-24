import { ReactNode } from "react";
import { auth } from "@/auth";
import MenuList from "@/components/MenuList";

export default async function Layout({ children }: { children: ReactNode }) {
  const session:any = await auth();
  const menus: string[] = ["personal", "connections", "manage"];

  return (
    <main className="h-full flex">
      <div className="bg-violet-100 border-r overflow-auto">
        <MenuList menus={menus} pathSegment="/account/" />
      </div>
      <div className="w-full overflow-auto">
        {children}
      </div>
    </main>
  );
}
