// 'use client'

// import { useState } from 'react'
import { getRoleMenus } from '@/constants/menus'
import MenuList from '@/components/ui/advanced/MenuList'
import StudentFilters from '@/components/filters/StudentFilters'
// import { StudentContextProvider, useStudentContext } from '@/contexts/StudentContext'

export default function StudentLayout({ children, data, dataset }: any) {
  // const { currentMenu, setCurrentMenu }: any = useStudentContext()

  return (
    // <StudentContextProvider data={data}>
      <div className="bg-white w-full h-full flex">
        <MenuList menus={getRoleMenus("student")} selected="" pathSegment="/dashboard/student" pathPosition={3} />
        <div className="w-full grid">
          <StudentFilters data={data} dataset={dataset} />
          <div className="w-full h-full p-2 space-y-2 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    // </StudentContextProvider>
  )
}
