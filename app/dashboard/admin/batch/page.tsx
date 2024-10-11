'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { createBatch, deleteBatch } from '@/actions/batch'
import { useAdminContext } from '@/contexts/AdminContext'
import CreateForm from '@/components/ui/advanced/CreateForm'
import BatchList from '@/components/lists/BatchList'
import BatchForm from '@/components/forms/BatchForm'

export default function Page({ params, searchParams }: { params: any, searchParams: any }) {
  const [batches, setBatches] = useState([])
  const [semesterOptions, setSemesterOptions] = useState([])
  const [createSuccess, setCreateSuccess] = useState(false)

  const { filters, syllabus }: any = useAdminContext()
  let batch_id = ''
  let syllabus_id = filters.find((filter: any) => filter.name === 'syllabus')?.options.find((option: any) => option.selected)?.value
  let degree_id = ''

  // to fetch batches data
  let { isLoading, isValidating, error, data } = useSWR(`/api/objects/batch?role=admin&batch_id=${batch_id}&syllabus_id=${syllabus_id}`)

  useEffect(() => {
    // if(!data) return
    setBatches(data?.data)
  }, [isLoading, createSuccess, syllabus_id, degree_id, batch_id])

  // need duration_in_semesters options from batch's syllabus
  // let { isLoading, isValidating, error, data } = useSWR(`/api/objects/syllabus?syllabus_id=${syllabus_id}`)
  // let semesterOptions = Array
  //   .from({ length: result.data.duration_semesters })
  //   .map((_, i) => ({ name: i + 1, value: i + 1 }) )

  const createBatchBinded = createBatch.bind(null, syllabus_id)
  
  return (
    <>
      <BatchForm batch_id={batch_id} syllabus_id={syllabus_id} degree_id={params.degree_id} />
      <BatchList data={batches} degree_id={degree_id} syllabus_id={syllabus_id} />
      {/* <DivisionCreate batchs={batchs} /> */}
    </>
  )
}
