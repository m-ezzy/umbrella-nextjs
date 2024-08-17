import { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function CheckSession({ children }: { children: ReactNode }) {
  const session:any = await auth()
  const headersList = headers()
  const nextRoute = headersList.get("referer")
  // const nextRoute = headersList.get("referer").split('/').splice(3, [activeUrl.split('/').length - 1]).join('/')
  // console.log(session, nextRoute)

  if(session?.user == undefined && nextRoute !== '/login') {
    redirect('/login');
  } else if(session?.user && nextRoute === '/login') {
    redirect('/')
  } else {
    return children
  }
}
