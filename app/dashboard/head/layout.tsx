import { ReactNode } from 'react';
import { selectById } from '@/models/Department';
import MenuList from '@/components/UI/MenuList';

export default async function Layout({ children, params }: { children: ReactNode, params: { department_id: number } }) {
  const department = await selectById(params.department_id);

  const nav = ['degrees', 'faculties', 'admin', 'activities'];

  return (
    <div className="h-full overflow-hidden flex">
      <div className='h-full min-h-full bg-violet-100 border-r'>
        <div className='bg-white font-bold flex justify-center p-2'>{department[0].department_name_acronym}</div>
        <MenuList menus={nav} pathSegment='' />
      </div>
      {children}
    </div>
  );
}
