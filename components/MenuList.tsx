// SidebarList

"use client";
import Link from 'next/link';

export default function MenuList({ menus, pathSegment, activeMenu }: { menus: string[], pathSegment: string, activeMenu?: string }) {
  const menuItems = menus.map((item, index) => {
    return (
      <Link href={item} key={item} className={`hover:bg-gray-200 border-b ${activeMenu === item ? 'bg-white' : ''}`}>
        {item[0].toUpperCase() + item.slice(1)}
      </Link>
    );
  });
  return (
    <ul className="bg-violet-100 text-2xl border-r p-4 pe-10 flex flex-col gap-2">
      {menuItems}
    </ul>
  );
}
