"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { auth, update } from "@/auth"

export default function MenuList({ menus, pathPosition }: any) {
  // const session: any = await auth();
  const [activeMenu, setActiveMenu] = useState(null)

  useEffect(() => {
    // console.log(window.location.pathname.split('/').slice(num).join('/'));
    setActiveMenu(window.location.pathname.split('/')[pathPosition])
  }, [])

  const menuItems = menus.map((item: any) => {
    return (
      <li key={item.key} className={`hover:bg-violet-200 min-w-max rounded-md p-2 ${activeMenu == item.key ? 'bg-violet-200' : ''}`} onClick={() => setActiveMenu(item.key)}>
        <Link key={item} href={item.link} className="flex items-center">
          <span className="material-symbols-outlined">{item.icon}</span>
          {item.title}
        </Link>
      </li>
    )
  });
  return (
    <ul className="bg-zinc-400 max-w-max h-max rounded-md p-2 space-y-2 gap-2">
      {menuItems}
    </ul>
  );
}
