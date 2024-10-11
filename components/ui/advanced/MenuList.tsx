"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { type Menu } from "@/constants/menus"

export default function MenuList({
  menus, selected, setCurrentMenu, pathSegment, pathPosition,
}: {
  menus: Menu[], selected?: string, setCurrentMenu?: any, pathSegment: string, pathPosition: number,
}) {
  // let activeMenu: any;
  // useEffect(() => {
  //   activeMenu = window.location.pathname.split('/')[pathPosition]
  // }, [])

  let [collapsed, setCollapsed] = useState<boolean>(false)
  let [activeMenu, setActiveMenu] = useState<string | null>(null)
  let pathname: string = usePathname()
  let currentRoute: string | undefined = pathname.split('/')[pathPosition]
  // let currentRoute = pathname.split('/')[pathname.split('/').length - 1]
  // let currentRoute = window.location.pathname.split('/')[pathPosition]

  if(activeMenu == null && currentRoute != undefined) {
    setActiveMenu((prev: any) => `/${currentRoute}`)
    if(setCurrentMenu != undefined) setCurrentMenu(`/${currentRoute}`)
  } else if(activeMenu != null && currentRoute == undefined) {
    setActiveMenu((prev: any) => null)
    if(setCurrentMenu != undefined) setCurrentMenu(null)
  }

  const items = menus.map((menu: Menu) => {
    // const isActive = currentRoute == item || currentRoute.startsWith(menu)
    return (
      // <li>
      <Link
        key={menu.name}
        href={`${pathSegment}${menu.href}`}
        aria-description="menu-item"
        about="menu-item"
        
        className={`${menu.href == activeMenu ? "bg-gray-200" : ""} hover:bg-gray-200 min-w-max border- rounded p-2 flex gap-1`}
        onClick={(e) => setActiveMenu(menu.href)}
      >
        <span className="material-symbols-outlined">{menu.icon}</span>
        {!collapsed && <span>{menu.name}</span> }
      </Link>
      // </li>
    )
  })
  return (
    <ul className="min-w-min border-r p-1 space-y-1 overflow-y-auto">
      <li className="mb-2" onClick={(e) => setCollapsed(prev => !prev)}>
        <span className="material-symbols-outlined">menu</span>
      </li>
      {items}
    </ul>
  )
}
