import Link from "next/link";
import { auth, update } from "@/auth";
import { prisma } from "@/lib/db";
import MenuList from "./_components/MenuList";

export default async function Layout({ children }: { children: any }) {
  const menus: any = [
    {
      key: "student",
      title: "Student",
      link: "/dashboard/tree/student",
      icon: "person",
    },
    {
      key: "professor",
      title: "Professor",
      link: "/dashboard/tree/professor",
      icon: "person",
    },
    {
      key: "admin",
      title: "Admin",
      link: "/dashboard/tree/admin",
      icon: "person",
    },
    {
      key: "head",
      title: "Head",
      link: "/dashboard/tree/head",
      icon: "person",
    },
    {
      key: "director",
      title: "Director",
      link: "/dashboard/tree/director",
      icon: "person",
    },
  ];
    {/* Director Manager */}
    {/* <h3 className="font-semibold border p-2">Staff - Clerks, Librarian, Poen, Watchman,...</h3> */}
    {/* <h3 className="font-semibold border p-2">Applicant Student</h3> */}
    {/* <h3 className="font-semibold border p-2">Applicant Faculty</h3> */}

  return (
    <div className="bg-zinc-400 w-full h-full flex overflow-x-auto">
      <MenuList menus={menus} pathPosition={3} />
      <div className="w-full h-full border-l">
        {children}
      </div>
    </div>
  );
}
