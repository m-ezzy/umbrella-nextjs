"use client";
import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children, params }: { children: ReactNode, params: any }) {
  // get route from next/router in server component

  // select nav based on route
  const route = usePathname();
  console.log(route);
  const pageOpened = route.split('/')[2];

  const nav = ['schedule', 'courses', 'resourses', 'sessions', 'attendance', 'assignments', 'exams', 'grades', 'activities', 'salary'];

  const navItems = nav.map((item, index) => {
    return (
      <Link href={`/student/${params.enrollment}/${item}`} key={item} className={`border-b ${pageOpened === item ? 'bg-white' : ''}`}>
        {index == 0 ? 'Home' : item[0].toUpperCase() + item.slice(1)}
      </Link>
    );
  });

  return (
    <div className="bg-white h-full flex">
      <nav className="bg-violet-100 text-2xl border-r p-4 flex flex-col gap-2">
        {navItems}
      </nav>
      {children}
    </div>
  );
}
