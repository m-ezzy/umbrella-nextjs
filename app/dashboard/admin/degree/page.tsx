"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import useSWR from "swr"
import { createDegree, deleteDegree } from "@/actions/degree"
import { useAdminContext } from "@/contexts/AdminContext"
import ListTable from "@/components/ui/advanced/ListTable"

export default function Page({ params, searchParams }: { params: any, searchParams: any }) {
  const [degrees, setdegrees] = useState([])
  const [createSuccess, setCreateSuccess] = useState(false)

  const { filters, syllabus }: any = useAdminContext()
  let degree_id = ""
  let syllabus_id = filters.find((filter: any) => filter.label === "Syllabus")?.options.find((option: any) => option.selected)?.value
  let batch_id = filters.find((filter: any) => filter.label === "Batch")?.options.find((option: any) => option.selected)?.value

  let { isLoading, isValidating, error, data } = useSWR(`/api/objects/degree?role=admin&degree_id=${degree_id}&batch_id=${batch_id}`)

  useEffect(() => {
    console.log("Degree Page:", data, isLoading, isValidating)
    setdegrees(data?.data)
  }, [isLoading, isValidating])

  const createdegreeBinded = createDegree.bind(null, batch_id);

  const fields: any[] = [
    {
      type: "text",
      label: "Batch of Year",
      name: "batch_start_year",
      value: filters.find((filter: any) => filter.label === "Batch")?.options.find((option: any) => option.selected)?.name,
      disabled: true,
    },
    {
      type: "hidden",
      name: "batch_id",
      value: batch_id,
    },
    {
      type: "text",
      label: "Name",
      name: "name",
    },
  ]
  let dataset: any[] = degrees?.map((degree: any) => {
    return {
      id: degree.id,
      Name: degree.name,
      "Name Short": degree.name_short,
      // Enrollments: <><Link href={`degrees/${degree.id}/enrollments`} className="text-violet-400 underline">enrollments</Link> ({degree._count.enrollments})</>,
      // Teachings: <><Link href={`degrees/${degree.id}/teachings`} className="text-violet-400 underline">teachings</Link> ({degree._count.teachings})</>,
    }
  })
  return <ListTable data={dataset} />
}
