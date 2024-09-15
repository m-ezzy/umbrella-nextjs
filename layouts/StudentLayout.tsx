// "use client";
// import { useState } from "react";
import MenuList from "@/components/ui/MenuList";
import StudentFilters from "@/components/filters/StudentFilters";
import { StudentContextProvider } from "@/contexts/StudentContext";
import { studentMenus } from "@/constants/menus";

export default function StudentLayout({ data, children }: any) {
  return (
    <StudentContextProvider data={data}>
      <div className="bg-white w-full flex size-full">
        <MenuList menus={studentMenus} selected="" pathSegment="/dashboard/student" pathPosition={3} />
        <div className="w-full">
          <StudentFilters data={data} />
          {children}
        </div>
      </div>
    </StudentContextProvider>
  );
}
