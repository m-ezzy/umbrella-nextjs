import Link from "next/link";

export default function MenuList({ menus, selected }: any) {
  const items = menus.map((menu: any) => (
    <div key={menu.key} className={`${menu.key == selected ? "bg-violet-200" : "bg-gray-200"} border rounded-md p-1 hover:bg-gray-300`}>
      <Link href={menu.link} className="p-2 hover:animate-pulse flex flex-col text-center">
        <span className="material-symbols-outlined">{menu.icon}</span>
        {menu.title} {/* title label name */}
      </Link>
    </div>
  ))
  return (
    <div className="border p-2 space-y-2">
      {items}
    </div>
  );
}
