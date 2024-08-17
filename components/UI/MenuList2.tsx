// SidebarList
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MenuList({ menus, pathSegment, activeMenu }: { menus: string[], pathSegment: string, activeMenu?: string }) {
  let pathname = usePathname();
  // pathname = pathname.split('/').slice(4).join('/');
  const currentRoute = pathname.split('/')[pathname.split('/').length - 1];

  const menuItems = menus.map((item, index) => {
    // const isActive = pathname == item || pathname.startsWith(item);
    const isActive = currentRoute == item || currentRoute.startsWith(item);

    return (
      <Link key={item} href={`${pathSegment}/${item}`} className={`hover:bg-gray-200 rounded-md p-1 pe-8 ${isActive ? 'bg-gray-200' : ''}`}>
        {item[0].toUpperCase() + item.slice(1)}
      </Link>
    );
  });
  return (
    <ul className="text-xl p-2 flex flex-col space-y-1">
      {menuItems}
    </ul>
  );
}
