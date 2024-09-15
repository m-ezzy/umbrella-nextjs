import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';
import { adminMenus } from '@/constants/menus';
import MenuList from '@/components/ui/MenuList';
import AdminFilters from '@/components/filters/AdminFilters';
import { AdminContextProvider } from '@/contexts/AdminContext';

export default async function Layout({ children }: { children: ReactNode }) {
  const session:any = await auth();

  const adminDegrees: any[] = await prisma.admin.findMany({
    select: {
      degree: {
        select: {
          id: true,
          name: true,
          name_acronym: true,
          department: {
            select: {
              id: true,
              name: true,
              name_acronym: true,
              university: {
                select: {
                  id: true,
                  name: true,
                  name_acronym: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      user_id: session.user.id,
    },
  });
  if(adminDegrees.length == 0) {
    return <div>You're not admin of any degree yet</div>;
  }
  let dataset: any[] = adminDegrees.map((admin: any) => ({
    university_id: admin.degree.department.university.id,
    university_name: admin.degree.department.university.name,
    university_name_acronym: admin.degree.department.university.name_acronym,
    department_id: admin.degree.department.id,
    department_name: admin.degree.department.name,
    department_name_acronym: admin.degree.department.name_acronym,
    degree_id: admin.degree.id,
    degree_name: admin.degree.name,
    degree_name_acronym: admin.degree.name_acronym,
  }));
  let filters: any = [
    {
      name: "University",
      name_field: "university_name",
      value_field: "university_id",
    },
    {
      name: "Department",
      name_field: "department_name",
      value_field: "department_id",
    },
    {
      name: "Degree",
      name_field: "degree_name",
      value_field: "degree_id",
    },
  ];
  return (
    <div className='w-full flex'>
      <MenuList menus={adminMenus} selected='' pathSegment='/dashboard/admin' pathPosition={3} />
      <div className='w-full'>
        <AdminContextProvider dataset={dataset}>
          <AdminFilters filters={filters} dataset={dataset} />
          {children}
        </AdminContextProvider>
      </div>
    </div>
  );
}
