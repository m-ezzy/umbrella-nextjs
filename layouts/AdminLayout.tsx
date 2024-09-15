"use client";
import { useState } from "react";
import MenuList from "@/components/ui/MenuList";
import { studentMenus } from "@/constants/menus";

export default function AdminLayout({ data, children }: any) {
  const [filters, setFilters] = useState([]);

  return (
    // <AdminContextProvider data={data}>
      <div className="bg-white w-full flex size-full">
        <MenuList menus={studentMenus} selected="" pathSegment="/dashboard/admin" pathPosition={3} />
        <div className="w-full">

          {children}
        </div>
      </div>
    // </AdminContextProvider>
  );
}
