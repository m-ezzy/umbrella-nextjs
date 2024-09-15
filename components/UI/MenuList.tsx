"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { auth, update } from "@/auth"
import { Menu } from "@/constants/menus"

export default function MenuList({ menus, selected, pathSegment, pathPosition }: { menus: Menu[], selected?: string, pathSegment: string, pathPosition: number }) {
  // const session: any = await auth();

  // let activeMenu: any;
  // useEffect(() => {
  //   activeMenu = window.location.pathname.split('/')[pathPosition]
  // }, []);

  let [activeMenu, setActiveMenu]: any = useState(null);

  let pathname: string = usePathname();
  let currentRoute: string | undefined = pathname.split('/')[pathPosition];
  // let currentRoute = pathname.split('/')[pathname.split('/').length - 1];
  // let currentRoute = window.location.pathname.split('/')[pathPosition]

  if(activeMenu == null && currentRoute != undefined) {
    setActiveMenu((prev: any) => `/${currentRoute}`);
  } else if(activeMenu != null && currentRoute == undefined) {
    setActiveMenu((prev: any) => null);
  }

  let handleClick = (href: any) => setActiveMenu(href);

  const items = menus.map((menu: Menu) => {
    // const isActive = currentRoute == item || currentRoute.startsWith(menu);
    return (
      // <li>
      <Link 
        key={menu.name} 
        href={`${pathSegment}${menu.href}`} 
        className={`${menu.href == activeMenu ? "bg-violet-200" : ""} hover:bg-gray-100 min-w-max border rounded ps-2 pe-4 py-2 flex gap-1`} 
        onClick={() => handleClick(menu.href)}
      >
        <span className="material-symbols-outlined">{menu.icon}</span>
        <span>{menu.name}</span>
      </Link>
      // </li>
    );
  });
  return (
    <ul className="min-w-max border-r p-2 space-y-2 overflow-y-auto">
      {items}
    </ul>
  );
}
