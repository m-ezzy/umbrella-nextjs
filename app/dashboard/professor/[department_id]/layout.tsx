import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/ui/Sidebar';
import MenuList from '@/components/ui/MenuList';
import { prisma } from '@/lib/db';
import { professorMenus } from '@/constants/menus';

export default async function Layout({ children, params }: { children: ReactNode, params: any }) {
  const department: any = await prisma.department.findUniqueOrThrow({
    where: {
      id: parseInt(params.department_id),
    },
  })
  .catch(() => {
    return { error: 'Unknown' };
  });

  if(department.error) {
    redirect('/dashboard');
  }
  return (
    <div className="h-full flex">
      <Sidebar>
        <div className='bg-violet-100 font-bold border-b p-2 flex justify-center'>{department.name_acronym}</div>
        <MenuList menus={professorMenus} pathSegment={`/dashboard/professor/${params.department_id}`} pathPosition={4} />
      </Sidebar>
      {children}
    </div>
  );
}
