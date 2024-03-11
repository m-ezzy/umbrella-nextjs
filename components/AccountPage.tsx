"use client";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { logout } from "@/lib/authThings";

export default function Account({ user }: any) {
  const handleClickLogout = () => {
    logout();
    redirect("/login");
  };
  return (
    <main className="flex p-4 gap-4">


      

      <div>
        <button className="mt-2" onClick={handleClickLogout}>Logout</button>
      </div>
    </main>
  );
}
