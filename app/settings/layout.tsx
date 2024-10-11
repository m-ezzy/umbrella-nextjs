import { ReactNode } from "react"
import { auth } from "@/lib/auth"
import { settingMenus } from "@/constants/menus"
import Sidebar from "@/components/ui/basic/Sidebar"
import MenuList from "@/components/ui/advanced/MenuList"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  if(!session) redirect("/login?next=/settings")

  return (
    <main className="h-full flex">
      {/* <Sidebar> */}
        <MenuList menus={settingMenus} pathSegment="/settings" pathPosition={2} />
      {/* </Sidebar> */}
      <div className="w-full overflow-auto">
        {children}
      </div>
    </main>
  )
}
