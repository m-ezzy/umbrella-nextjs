"use client"

import useSWR from "swr"
import Select from "react-select"
import FilterReactSelect from "@/components/ui/advanced/FilterReactSelect"

export default function DepartmentFilter({ university_id, options, valueType="string", multiple=false, setFilters, setLastChangedFilter, dispatch }: any) {
  let { isLoading, isValidating, error, data, mutate } = useSWR(`/api/objects/department?university_id=${university_id}`)

  return <Select aria-label="Department"  />
}
