import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { auth, signOut } from "@/auth";
import { logout } from "@/lib/authThings";
import AccountPage from "@/components/AccountPage";
import MenuList from "@/components/MenuList";

export default async function Page(props) {
  console.log(props);
  redirect("/account/personal")
}
