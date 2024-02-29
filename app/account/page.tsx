"use client"
import { redirect } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Account() {
  // const { data: session }: any = useSession()
  const { status, data }: any = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })
  console.log(data)

  if (status === "loading") {
    return <div>Loading...</div>
  }
  if (status === "unauthenticated") {
    redirect("/login")
  }
  return (
    <div className="p-4">
      <div>{JSON.stringify(data, null, 4)}</div>
      <button className="btn border p-2 bg-purple-500 hover:bg-purple-400" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
      {/* <form
        action={async () => {
          'use server';
          await signOut();
        }}
      ></form> */}
    </div>
  );
}
