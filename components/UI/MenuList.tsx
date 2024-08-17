"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, update } from "@/auth"

export default function MenuList({ menus, selected, pathSegment, pathPosition }: any) {
  // const session: any = await auth();
  let [activeMenu, setActiveMenu]: any = useState(null)
  // let activeMenu: any

  let current: string | undefined = window.location.pathname.split('/')[pathPosition]

  if(activeMenu == null && current != undefined) {
  // useEffect(() => {
    // console.log(window.location.pathname.split('/').slice(num).join('/'));
    setActiveMenu((prev: any) => current);
    // activeMenu = window.location.pathname.split('/')[pathPosition];  
  // }, [])
  }
  let handleClick = (key: any) => {
    setActiveMenu(key);
  }

  const items = menus.map((menu: any) => (
    <div key={menu.key} className={`min-w-max border rounded hover:bg-gray-100 ${menu.key == activeMenu ? "bg-violet-200" : ""}`} onClick={() => handleClick(menu.key)}>
      <Link href={`${pathSegment}${menu.link}`} className="p-4 flex gap-1">
        <span className="material-symbols-outlined">{menu.icon}</span>
        {menu.title} {/* title label name */}
      </Link>
    </div>
  ))
  return (
    // <ul className="bg-zinc-400 max-w-max h-max rounded-md p-2 space-y-2 gap-2">
      // <li></li>
    // </ul>
    <div className="min-w-max border-r p-2 space-y-2">
      {items}
    </div>
  );
}
