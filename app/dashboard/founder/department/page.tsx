"use client"

import { Suspense, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { getDepartments, createDepartment, deleteDepartment } from '@/actions/department'
import { useFounderContext } from '@/contexts/FounderContext'
import CreateForm from '@/components/ui/advanced/CreateForm'
import DepartmentData from './DepartmentData'
import { TableSkeleton } from '@/components/ui/basic/skeletons'
import ListTable from '@/components/ui/advanced/ListTable'

export default function Page({ data }: any) {
  // const [value, setValue]: any = useState(undefined)
  const { filters, setFilters }: any = useFounderContext()
  const [departmentData, setDepartmentData]: any = useState([])
  const [state, dispatch, isPending]: any = useFormState(getDepartments, null)

  const selectedUniversity = filters.find((filter: any) => filter.name === 'University')?.options.find((option: any) => option.selected)

  // useEffect(() => {
  //   setValue({ filters, selectedUniversity });
  // }, []);

  useEffect(() => {
    const fetcher = async () => {
      const fd = new FormData()
      fd.append('filters', JSON.stringify(filters))
      fd.append('selectedUniversity', JSON.stringify(selectedUniversity))
      const result: any = await getDepartments(state, fd)
      setDepartmentData((prev: any) => result.data)
    }
    fetcher()
  }, [])

  const createFormFields: any[] = [
    // {
    //   type: 'select',
    //   label: 'University',
    //   name: 'university_id',
    //   options: filters[0].options,
    // },
    {
      type: 'hidden',
      label: 'University',
      name: 'university_id',
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
      label: 'Name Short',
      name: 'name_short',
    },
  ]

  const createButtonDisabled = selectedUniversity ? false : true

  return (
    <>
      <CreateForm fields={createFormFields} serverAction={createDepartment} objectName='Department' buttonDisabled={createButtonDisabled} />
      {/* {value !== undefined && ( */}
        {/* <Suspense fallback={<TableSkeleton columns={4} />} > */}
          {/* <DepartmentData filters={filters} university={selectedUniversity} /> */}
          {/* <DepartmentData {...value} /> */}
        {/* </Suspense> */}
      {/* )} */}
      {departmentData ? <ListTable data={departmentData} /> : <TableSkeleton columns={4} />}
      {/* <ListWithFilters dataset={founderUniversity} id_column='id' /> */}
    </>
  )
}
