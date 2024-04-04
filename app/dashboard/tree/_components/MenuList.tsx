"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, update } from "@/auth";

export default function MenuList({ menus, pathPosition }: any) {
  // const session: any = await auth();
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    // console.log(window.location.pathname.split('/').slice(num).join('/'));
    setActiveMenu(window.location.pathname.split('/')[pathPosition]);
  }, []);

  let handleClick = (key: any) => {
    setActiveMenu(key);
  }

  const menuItems = menus.map((item: any) => {
    return (
      <li key={item.key} className={`hover:bg-violet-100 min-w-max rounded-md p-1 ${activeMenu == item.key ? 'bg-violet-200' : ''}`} onClick={() => handleClick(item.key)}>
        <Link key={item} href={item.link} className="flex items-center">
          <span className="material-symbols-outlined">{item.icon}</span>
          {item.title}
        </Link>
      </li>
    )
  });
  return (
    <ul className="min-w-max text-xl block m-1 space-y-1">
      {menuItems}
    </ul>
  );
}
