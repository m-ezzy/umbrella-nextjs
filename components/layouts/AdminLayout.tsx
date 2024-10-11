"use client"

import { getRoleMenus } from "@/constants/menus"
import { useAdminContext } from "@/contexts/AdminContext"
import AdminFilters from "@/components/filters/AdminFilters"
import MenuList from "@/components/ui/advanced/MenuList"

export default function AdminLayout({ children, initialData }: any) {
  const { menu, setMenu }: any = useAdminContext()

  return (
    <div className="bg-white grid grid-flow-col">
      <MenuList menus={getRoleMenus("admin")} setCurrentMenu={setMenu} pathSegment='/dashboard/admin' pathPosition={3} />
      <div className="h-screen overflow-hidden">
        {/* <Suspense fallback={<FilterListSkeleton />}> */}
          <AdminFilters initialData={initialData} /> {/* filters={filters} setFilters={setFilters} */}
        {/* </Suspense> */}
        <div className="w-full h-full p-2 space-y-2 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
