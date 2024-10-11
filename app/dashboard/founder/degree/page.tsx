'use client'

import { Suspense } from 'react'
import { degree_type } from '@prisma/client'
import { createDegree, deleteDegree } from '@/actions/degree'
import { useFounderContext } from '@/contexts/FounderContext'
import CreateForm from '@/components/ui/advanced/CreateForm'
import { TableSkeleton } from '@/components/ui/basic/skeletons'
import DegreeData from './DegreeData'
import useSWR from 'swr'

export default function Page({ data }: any) {
  const { filters, setFilters }: any = useFounderContext()
  const university = filters.find((filter: any) => filter.name === 'University')?.options.find((option: any) => option.selected)
  const department = filters.find((filter: any) => filter.name === 'Department')?.options.find((option: any) => option.selected)

  useSWR([university, department], () => createDegree({ university, department }))

  const createFormFields: any[] = [
    // {
    //   type: 'hidden',
    //   label: 'University',
    //   name: 'university_id',
    //   defaultValue: selectedUniversity?.value,
    // },
    // {
    //   type: 'text',
    //   label: 'University Name',
    //   name: 'university_name',
    //   disabled: true,
    //   defaultValue: selectedUniversity?.name,
    // },
    {
      type: 'hidden',
      label: 'Department',
      name: 'department_id',
      defaultValue: department?.value,
    },
    {
      type: 'text',
      label: 'Department Name',
      name: 'department_name',
      disabled: true,
      defaultValue: department?.name,
    },
    {
      type: 'text',
      label: 'Name',
      name: 'name',
    },
    {
      type: 'text',
      label: 'Name Short',
      name: 'name_short',
    },
    {
      type: 'select',
      label: 'Type',
      name: 'type',
      options: Object.entries(degree_type).map(([key, value]) => ({ name: key, value: value })),
      // options: [
      //   { name: 'Undergraduate', value: 'Undergraduate' },
      //   { name: 'Postgraduate', value: 'Postgraduate' },
      // ],
    },
  ]

  const createButtonDisabled = department ? false : true;

  return (
    <>
      <CreateForm fields={createFormFields} serverAction={createDegree} objectName='Degree' buttonDisabled={createButtonDisabled} />
      <Suspense fallback={<TableSkeleton columns={4} />} >
        <DegreeData filters={filters} selectedFilters={{ university, department }} />
      </Suspense>
      {/* <ListTable data={dataset} /> */}
      {/* <ListWithFilters dataset={founderUniversity} id_column='id' /> */}
    </>
  )
}
