// import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { userLogout } from "@/actions/auth";

export default function Page() {
  const session:any = auth();

  // const { pending, ...other } = useFormStatus();
  // console.log(pending, other);

  const sessions:any = [];
  
  let activeSessions = sessions.map((session: any) => (
    <li key={session.id}>
      <p>{session.ip}</p>
      <p>{session.userAgent}</p>
      <p>{session.createdAt}</p>
      <form action={`/account/manage/sessions/${session.id}/revoke`} method="post">
        <button type="submit">Revoke</button>
      </form>
    </li>
  ));

  return (
    <div className="p-2">
      <ul>
        {activeSessions}
      </ul>
      <form action={userLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
