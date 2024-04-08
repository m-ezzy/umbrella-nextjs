"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MenuList({ menus, pathPosition }: any) {
  const [activeMenu, setActiveMenu] = useState(null);

  // let activeMenu: any

  useEffect(() => {
    setActiveMenu(window.location.pathname.split('/')[pathPosition + 1]);
    // activeMenu = window.location.pathname.split('/')[pathPosition];
  }, []);

  let handleClick = (key: any) => {
    setActiveMenu(key)
  }


  const menuItems = menus.map((item: any) => {
    return (
      <span key={item.key} className={`hover:bg-violet-100 rounded-md p-2 ${activeMenu == item.key ? 'bg-violet-300' : ''}`} onClick={() => handleClick(item.key)}>
        <Link key={item} href={item.link} className="flex items-center">
          {/* <span className="material-symbols-outlined">{item.icon}</span> */}
          {item.title}
        </Link>
      </span>
    )
  });
  return (
    <div className={`${pathPosition % 2 ? "bg-gray-100" : "bg-gray-200"} border-violet-40 border-b-2 p-1 flex gap-1 justify-center`}>
      {menuItems}
    </div>
  );
}
