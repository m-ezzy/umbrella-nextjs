'use client'

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import useSWR, { mutate } from "swr"
import { deleteSyllabus, deleteMultipleSyllabus } from "@/actions/syllabus"
import { useAdminContext } from "@/contexts/AdminContext"
import SyllabusModal from "@/components/forms/SyllabusForm"
import ListTable from "@/components/ui/advanced/ListTable"
import { TableSkeleton } from "@/components/ui/basic/skeletons"
import DeleteForm from "@/components/ui/advanced/DeleteForm"

export default function Page() {
  const [createSuccess, setCreateSuccess] = useState(false)
  const [syllabuses, setSyllabuses] = useState([])
  const [dataFetchLoading, setDataFetchLoading] = useState(true)
  // const [state, dispatch] = useFormState(getSyllabuses, { data: [], error: null })
  // let { error, success, data }: any = state
  
  const { filters, setFilters, semester }: any = useAdminContext()
  const syllabus_id = filters.find((filter: any) => filter.name === "syllabus")?.options.find((option: any) => option.selected)?.value
  const degree_id = filters.find((filter: any) => filter.name === "degree")?.options.find((option: any) => option.selected)?.value
  let semesterValue = (syllabus_id == undefined) ? semester?.options.find((option: any) => option.selected)?.value : undefined

  const { isLoading, isValidating, error, data, mutate } = useSWR<{
    id: number;
    code: string;
    year_effective: number;
    duration_semesters: number;
    _count: {
      courses: number;
      batches: number;
    };
  }[]>(degree_id ? `/api/objects/syllabus?degree_id=${degree_id}` : null)

  // if(degree_id == undefined) {
    // mutate(`/api/objects/syllabus?degree_id=${degree_id}`)
  // }

  // to fetch syllabus data and show in table
  // useEffect(() => {
    // const fetcher: any = async () => {
      // const fd = new FormData();
      // if(syllabus_id) fd.append("syllabus_id", syllabus_id);
      // if(degree_id) fd.append("degree_id", degree_id);
      // if(semesterValue) fd.append("semester", semesterValue);
      // dispatch(fd);
      // const result: any = getSyllabuses(state, fd);
      // setSyllabuses(result?.data);
    // };

    // setDataFetchLoading(true);
    // fetcher();
  // }, [createSuccess, syllabus_id, degree_id, semesterValue]);

  // to set syllabus data in state once we get response from server
  // useEffect(() => {
  //   setSyllabuses((prev: any) => data);
  //   setDataFetchLoading(false);
  // }, [success, data]);

  // to set syllabus data in filters
  // useEffect(() => {
  //   if(filters.find((filter: any) => filter.label === "Syllabus") === undefined && syllabuses?.length > 0) {
  //     setFilters((prev: any) => {
  //       prev.splice(0, prev.findIndex((filter: any) => filter.label === "Syllabus"));
  //       return [
  //         ...prev,
  //         {
  //           label: "Syllabus",
  //           name: "syllabus_id",
  //           options: syllabuses?.map((s: any) => ({ name: s.year_effective, value: s.id })),
  //         },
  //       ];
  //     });
  //   }
  // }, [degree_id, syllabuses?.length]);

  let dataset = data?.map((syllabus: any) => {
    return {
      id: syllabus.id,
      Code: syllabus.code,
      "Year Effective": syllabus.year_effective,
      "Duration in Semesters": syllabus.duration_semesters,
      Detail: <Link className="text-violet-400 underline" href={`syllabuses/${syllabus.id}`}>Detail</Link>,
      // "Courses Count": syllabus._count.courses,
      // "Batches Count": syllabus._count.batches,
      // Courses: <><Link href={`syllabuses/${syllabus.id}/courses`} className="text-violet-400 underline">courses</Link> ({syllabus._count.courses})</>,
      // Batches: <><Link href={`syllabuses/${syllabus.id}/batches`} className="text-violet-400 underline">batches</Link> ({syllabus._count.batches})</>,
      Courses: <><Link href={`course?syllabus_id=${syllabus.id}`} className="text-violet-400 underline">courses</Link> ({syllabus._count.courses})</>,
      Batches: <><Link href={`batch?syllabus_id=${syllabus.id}`} className="text-violet-400 underline">batches</Link> ({syllabus._count.batches})</>,
      // Edit: <EditForm fields={fields} serverAction={updateSyllabus} objectName="Syllabus" />,
      Delete: <DeleteForm objectName="Syllabus" id={syllabus.id} serverAction={deleteSyllabus} />,
    }
  })
  return (
    <>
      <SyllabusModal degree_id={degree_id} />
      {isLoading ?
        <TableSkeleton /> : 
        <ListTable data={dataset} deleteMultipleAction={deleteMultipleSyllabus} />
      }
    </>
  )
}
