// SidebarList
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MenuList({ menus, pathSegment, activeMenu }: { menus: string[], pathSegment: string, activeMenu?: string }) {
  const route = usePathname();
  const pageOpened = route.split('/')[route.split('/').length - 1];

  const menuItems = menus.map((item, index) => {
    return (
      <Link href={item} key={item} className={`hover:bg-gray-200 rounded-md p-1 pe-8 ${pageOpened === item ? 'bg-gray-200' : ''}`}>
        {item[0].toUpperCase() + item.slice(1)}
      </Link>
    );
  });
  return (
    <ul className="h-ful text-xl p-2 flex flex-col gap-1">
      {menuItems}
    </ul>
  );
}
