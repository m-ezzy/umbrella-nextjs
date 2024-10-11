"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createDivision, deleteDivision } from "@/actions/division"
import { useAdminContext } from "@/contexts/AdminContext"
import CreateForm from "@/components/ui/advanced/CreateForm"
import ListTable from "@/components/ui/advanced/ListTable"
import DeleteForm from "@/components/ui/advanced/DeleteForm"
import useSWR from "swr"

export default function Page({ params, searchParams }: { params: any, searchParams: any }) {
  const [divisions, setDivisions] = useState([])
  const [createSuccess, setCreateSuccess] = useState(false)

  const { filters, syllabus }: any = useAdminContext()
  let degree_id = ""
  let syllabus_id = filters.find((filter: any) => filter.name === "syllabus")?.options.find((option: any) => option.selected)?.value
  let batch_id = filters.find((filter: any) => filter.name === "batch")?.options.find((option: any) => option.selected)?.value
  let division_id = ""

  let { isLoading, isValidating, error, data, mutate } = useSWR(`/api/objects/division?`)

  // to fetch divisions data
  useEffect(() => {
    async function fetcher() {
      const response: any = await fetch("/api/objects/division", {
        method: "POST",
        body: JSON.stringify({ batch_id: batch_id }),
      })
      .then(async (res) => await res.json())
      .catch((err) => err)
      
      setDivisions(response.data)
    }
    fetcher();
  }, [createSuccess, syllabus_id, degree_id, batch_id, division_id])

  const createDivisionBinded = createDivision.bind(null, batch_id)

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

  let dataset: any[] = divisions?.map((division: any) => {
    return {
      "id": division.id,
      "Name": division.name,
      "Enrollments": <><Link href={`divisions/${division.id}/enrollments`} className="text-violet-400 underline">enrollments</Link> ({division._count.enrollments})</>,
      "Teachings": <><Link href={`divisions/${division.id}/teachings`} className="text-violet-400 underline">teachings</Link> ({division._count.teachings})</>,
      "Delete": <DeleteForm objectName="Division" id={division.id} serverAction={deleteDivision.bind(null, division.id)} />,
    }
  })
  return (
    <>
      <CreateForm objectName="Division" fields={fields} serverAction={createDivisionBinded} buttonDisabled={batch_id ? false : true} setSuccess={setCreateSuccess} />
      <ListTable data={dataset} />
    </>
  )
}
