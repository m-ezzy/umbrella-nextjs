"use client"

import { Suspense, useEffect, useState } from "react"
import useSWR from "swr"
import { course_category, course_type } from "@prisma/client"
// import prisma from "@/lib/prisma"
// import { auth } from "@/lib/auth"
import fetcher from "@/lib/fetcher"
import { createCourse } from "@/actions/course"
import { useAdminContext } from "@/contexts/AdminContext"
import CreateForm from "@/components/ui/advanced/CreateForm"
import ListTable from "@/components/ui/advanced/ListTable"
// import CourseDataFetcher from "./CourseDataFetcher"

export default function Page({ params, searchParams }: { params: any, searchParams: any }) {
  const [dataset, setDataset] = useState([])

  const searchParamsKeys: string[] = ["type", "category", "credits", "semester", "syllabus_id"]

  const { filters, setFilters }: any = useAdminContext()
  let filterCourse = filters.find((filter: any) => filter.label == "Course")?.options.find((option: any) => option.selected)?.value
  let filterSemester = filters.find((filter: any) => filter.label == "Semester")?.options.find((option: any) => option.selected)?.value
  let filterSyllabus = filters.find((filter: any) => filter.label == "Syllabus")?.options.find((option: any) => option.selected)?.value
  let filterProfessor = filters.find((filter: any) => filter.label == "Professor")?.options.find((option: any) => option.selected)?.value
  let filterDegree = filters.find((filter: any) => filter.label == "Degree")?.options.find((option: any) => option.selected)?.value
  let filterDepartment = filters.find((filter: any) => filter.label == "Department")?.options.find((option: any) => option.selected)?.value
  let filterUniversity = filters.find((filter: any) => filter.label == "University")?.options.find((option: any) => option.selected)?.value

  const { data, error, isLoading, isValidating, cache, mutate }: any = useSWR("/api/objects/course", fetcher, {})

  // useEffect(() => {
  //   if (data) {
  //     setDataset(data.data)
  //   }
  // }, [isLoading])
  
  const formFields: any = [
    {
      type: "hidden",
      name: "syllabus_id",
      value: filters.find((filter: any) => filter.label == "Syllabus")?.options?.find((option: any) => option.selcted)?.value,
      readOnly: true,
    },
    {
      type: "text",
      label: "Code",
      name: "code",
    },
    {
      type: "text",
      label: "Name",
      name: "name",
    },
    {
      type: "text",
      label: "Name Short",
      name: "name_short",
    },
    {
      type: "select",
      label: "Type",
      name: "type",
      options: Object.keys(course_type).map((key: any) => ({ name: key, value: key })),
    },
    {
      type: "select",
      label: "Category",
      name: "category",
      options: Object.values(course_category).map((value: any) => ({ name: value, value: value })),
    },
    {
      type: "number",
      label: "Credits",
      name: "credits",
      defaultValue: 4, //display the selected value but make it editable
    },
    {
      type: "number",
      label: "Semester",
      name: "semester",
      value: filterSemester,
      readOnly: true,
    },
    // {
    //   type: "select",
    //   label: "Semester",
    //   name: "semester",
    //   options: Array.from({ length: 10 }, (_, i) => ({ name: i + 1, value: i + 1, selected: filterSemester == i + 1 })), //syllabus.duration_semesters
    // },
  ]
  return (
    <>
      <CreateForm objectName="Course" fields={formFields} serverAction={createCourse} buttonDisabled={!filterSyllabus} />
      <ListTable data={data?.data} />
      {error && <div>Error on client, request not sent {error.toString()}</div>}
      {data?.error && <div>Error on server, request completed {error.toString()}</div>}
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        {/* <CourseDataFetcher filters={filters} /> */}
      {/* </Suspense> */}
    </>
  )
}
