"use client";
import { Suspense } from 'react';
import { createDepartment, deleteDepartment } from '@/actions/department';
import { useFounderContext } from '@/contexts/FounderContext';
import CreateForm from '@/components/ui/CreateForm';
import DepartmentData from './DepartmentData';

export default function Page({ data }: any) {
  const { filters, setFilters }: any = useFounderContext();
  console.log(filters);

  const selectedUniversity = filters.find((filter: any) => filter.name === 'University')?.options.find((option: any) => option.selected);

  const createFormFields: any[] = [
    // {
    //   type: 'select',
    //   label: 'University',
    //   name: 'university_id',
    //   options: filters[0].options,
    // },
    {
      type: 'number',
      label: 'University',
      name: 'university_id',
      hidden: true,
      defaultValue: selectedUniversity?.value,
    },
    {
      type: 'text',
      label: 'University Name',
      name: 'university_name',
      disabled: true,
      defaultValue: selectedUniversity?.name,
    },
    {
      type: 'text',
      label: 'Name',
      name: 'name',
    },
    {
      type: 'text',
      label: 'Name Acronym',
      name: 'name_acronym',
    },
  ];

  const createButtonDisabled = selectedUniversity ? false : true;

  return (
    <div className='h-full p-2 space-y-2 overflow-y-auto'>
      <CreateForm fields={createFormFields} serverAction={createDepartment} objectName='Department' disabled={createButtonDisabled} />
      <Suspense fallback={<div>Loading department list...</div>}>
        <DepartmentData filters={filters} university={selectedUniversity} />
      </Suspense>
      {/* <ListTable data={dataset} /> */}
      {/* <ListWithFilters dataset={founderUniversity} id_column='id' /> */}
    </div>
  );
}
