// "use client";
import { prisma } from '@/lib/db';
import { auth } from '@/auth';
import { createUniversity, deleteUniversity } from '@/actions/university';
import { useFounderContext } from '@/contexts/FounderContext';
import ActionForm from '@/components/ui/ActionForm';
import CreateForm from '@/components/ui/CreateForm';
import DeleteForm from '@/components/ui/DeleteForm';
import ListTable from '@/components/ui/ListTable';
import ListWithFilters from '@/components/ui/ListWithFilters';

export default async function Page() {
  const session:any = await auth();
  
  const founderUniversity: any[] = await prisma.university.findMany({
    select: {
      id: true,
      name: true,
      name_acronym: true,
      // _count: {
      //   select: {
      //     campuses: true,
      //     departments: true,
      //   },
      // },
    },
    where: {
      user_id: session.user.id,
    },
  });

  const createFormFields: any[] = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      // hidden: false,
      // required: true,
      // defaultValue: '',
    },
    {
      type: 'text',
      label: 'Name Acronym',
      name: 'name_acronym',
      // hidden: false,
      // required: true,
      // defaultValue: '',
    },
  ];

  const filters: any = [
    {
      label: 'University Name',
      options: founderUniversity.map((university: any) => ({ name: university.name, value: university.id })),
    },
    {
      label: 'University Name Acronym',
      options: founderUniversity.map((university: any) => ({ name: university.name_acronym, value: university.id })),
    },
  ];

  const dataset: any = founderUniversity.map((university: any) => {
    return {
      "Name": university.name,
      "Name Acronym": university.name_acronym,
      "Delete": <DeleteForm id={university.id} serverAction={deleteUniversity} objectName="university" />,
      // "Action": {
      //   "Edit": {
      //     icon: 'edit',
      //     label: 'Edit',
      //     action: updateUniversity,
      //     id: university.id,
      //   },
      //   "Delete": {
      //     icon: 'delete',
      //     label: 'Delete',
      //     action: deleteUniversity,
      //     id: university.id,
      //   },
      // },
    };
  });

  // const { setFilters }: any = useFounderContext();

  // setFilters((prev: any) => filters);

  return (
    <div className='h-full p-2 space-y-4 overflow-y-auto'>
      <details className='bg-gray-200 border rounded' open>
        <summary className='p-4'>Create University</summary>
        {/* <ActionForm type='create' fields={createFormFields} serverAction={createUniversity} button={{ icon: 'add', label: 'Create University' }} /> */}
        <CreateForm fields={createFormFields} serverAction={createUniversity} objectName='University' />
      </details>
      { founderUniversity.length ? <ListTable data={dataset} /> : <div>You're not founder of any university yet</div> }
      <ListWithFilters dataset={founderUniversity} id_column='id' />
    </div>
  );
}
