import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { auth, signOut } from "@/auth";
import { logout } from "@/lib/authThings";
import AccountPage from "@/components/AccountPage";

export default async function Account() {
  const session:any = await auth();
  return (
    <AccountPage user={session.user} />
  );
}
