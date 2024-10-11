// "use server"

import prisma from "@/lib/prisma"
import { auth } from '@/lib/auth'
import { deleteDegree } from '@/actions/degree'
import ListTable from '@/components/ui/advanced/ListTable'
import DeleteForm from '@/components/ui/advanced/DeleteForm'

export default async function DegreeData({ filters, selectedFilters: { selectedUniversity, selectedDepartment } }: any) {
  const session: any = await auth();

  let whereObject: any;
  if(selectedDepartment) {
    whereObject = {
      department_id: selectedDepartment.value,
    };
  } else if(selectedUniversity) {
    whereObject = {
      department: {
        university: {
          id: selectedUniversity.value,
          user_id: session.user.id,
        },
      },
    };
  } else {
    whereObject = {
      department: {
        university: {
          user_id: session.user.id,
        },
      },
    };
  }

  const degrees: any[] = await prisma.degree.findMany({
    where: whereObject,
  });
  const dataset: any = degrees.map((degree: any) => {
    return {
      "Name": degree.name,
      "Name Short": degree.name_short,
      "Delete": <DeleteForm id={degree.id} serverAction={deleteDegree} objectName="Degree" />,
    };
  });
  return (
    <>
      <ListTable data={dataset} />
    </>
  );
}
