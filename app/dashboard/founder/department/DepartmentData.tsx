"use server";
import { prisma } from '@/lib/db';
import { auth } from '@/auth';
import { deleteDepartment } from '@/actions/department';
import ListTable from '@/components/ui/ListTable';
import ListWithFilters from '@/components/ui/ListWithFilters';
import DeleteForm from '@/components/ui/DeleteForm';

export default async function DepartmentData({ filters, university }: any) {
  const session: any = await auth();

  let whereObject: any;
  if(university) {
    whereObject = {
      university_id: university.value,
      // university_id: {
      //   in: university.value,
      // },
    };
  } else {
    whereObject = {
      university: {
        user_id: session.user.id,
      },
    };
  }

  const departments: any[] = await prisma.department.findMany({
    where: whereObject,
  });
  const dataset: any = departments.map((department: any) => {
    return {
      "Name": department.name,
      "Name Acronym": department.name_acronym,
      "Delete": <DeleteForm id={department.id} serverAction={deleteDepartment} objectName="Department" />,
    };
  });
  return (
    <>
      <ListTable data={dataset} />
      <ListWithFilters dataset={departments} id_column='id' />
    </>
  );
}
