"use client"

import { useEffect, useRef, useState } from "react"
import useSWR from "swr"
import Filter from "@/components/ui/advanced/Filter"

export default function UniversityFilter({ role, setFilters, setLastChangedFilter, dispatch }: any) {
  let { isLoading, isValidating, error, data, mutate } = useSWR(`/api/objects/university?role=${role}`)

  return <Filter {...{ name:"university", options: data, valueType: "string", multiple:false, setFilters, setLastChangedFilter, dispatch }} />
}
