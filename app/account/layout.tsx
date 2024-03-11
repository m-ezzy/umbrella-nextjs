import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { auth, signOut } from "@/auth";
import { logout } from "@/lib/authThings";
import AccountPage from "@/components/AccountPage";
import MenuList from "@/components/MenuList";

export default async function Layout({ children }: { children: ReactNode }) {
  const session:any = await auth();
  const menus: string[] = ["personal", "providers"];

  return (
    <main className="flex">
      <MenuList menus={menus} pathSegment="account/" />
      {children}
    </main>
    // <AccountPage user={session.user} />
  );
}
