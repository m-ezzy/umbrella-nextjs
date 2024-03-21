import { ReactNode } from "react";
import { auth } from "@/auth";
import MenuList from "@/components/MenuList";

export default async function Layout({ children }: { children: ReactNode }) {
  const session:any = await auth();
  const menus: string[] = ["personal", "connections", "manage"];

  return (
    <main className="h-full flex">
      <div className="border-r">
        <MenuList menus={menus} pathSegment="/account/" />
      </div>
      {children}
    </main>
  );
}
