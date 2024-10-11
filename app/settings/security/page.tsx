// import { useEffect, useState } from "react";
// import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { revokeAuthSession, logout } from "@/actions/auth";
import ListTable from "@/components/ui/advanced/ListTable";

export default function Page() {
  const session:any = auth();
  // const { pending, ...other } = useFormStatus();
  // console.log(pending, other);

  const authSessions:any = [];

  const rows = authSessions.map((session: any) => {
    return {
      "IP Address": session.ip_address,
      Active: session.active,
      userAgent: session.userAgent,
      createdAt: session.createdAt,
      Revoke: <form action={revokeAuthSession}><button type="submit" className="bg-red-400">Revoke</button></form>,
    };
  });

  // clear localStorage when logout is clicked

  return (
    <div className="p-2">
      <ListTable data={rows} />
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
