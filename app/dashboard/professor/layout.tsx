import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/ui/Sidebar';
import MenuList from '@/components/ui/MenuList';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';
import { professorMenus } from '@/constants/menus';

export default async function Layout({ children }: { children: ReactNode }) {
  const session: any = await auth();

  const faculties: any = await prisma.faculty.findMany({
    include: {
      department: {
        include: {
          university: true,
        },
      },
    },
    where: {
      user_id: session.user.id,
    },
  })
  .catch((error: any) => {
    return { error: error.message };
  });

  if(faculties.error) {
    redirect('/dashboard');
  }
  return (
    <div className="w-full h-full flex">
      <Sidebar>
        <MenuList menus={professorMenus} pathSegment="/dashboard/professor" pathPosition={3} />
      </Sidebar>
      {children}
    </div>
  );
}
