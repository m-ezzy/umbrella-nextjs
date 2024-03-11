"use client";
import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuList from '@/components/MenuList';

export default function Layout({ children, params }: { children: ReactNode, params: any }) {
  // get route from next/router in server component

  // select nav based on route
  const route = usePathname();
  console.log(route);
  const pageOpened = route.split('/')[2];

  const nav = ['schedule', 'courses', 'resourses', 'lectures', 'attendance', 'assignments', 'exams', 'grades', 'activities', 'placement'];

  return (
    <div className="h-full flex">
      <MenuList menus={nav} pathSegment='' activeMenu={pageOpened} />
      {children}
    </div>
  );
}
