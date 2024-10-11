"use client"

import { Suspense, useState } from "react"
import MenuList from '@/components/ui/advanced/MenuList'
import FilterList from "@/components/ui/advanced/FilterList"
import { getRoleMenus } from '@/constants/menus'
import { FounderContextProvider, useFounderContext } from "@/contexts/FounderContext"
import FounderFilters from '@/components/filters/FounderFilters'

export default function FounderLayout({ children, data }: any) {
  // const [filters, setFilters] = useState([])
  const { filters, setFilters, render, setRender }: any = useFounderContext()

  // console.log("44444444444444888888888888888888888888")
  // console.log(filters)

  // if(filters.find((filter: any) => filter.name === 'University') === undefined && data.universities) {
  //   let universityFilter = {
  //     name: 'University',
  //     options: data.universities.map((university: any) => {
  //       return {
  //         name: university.name,
  //         value: university.id,
  //       };
  //     }),
  //   }
  //   setFilters((prev: any) => [
  //     ...prev.filter((filter: any) => filter.name !== 'University'),
  //     universityFilter
  //   ])
  // }
  // if(filters.find((filter: any) => filter.name === 'Department') === undefined && data.departments) {
  //   let departmentFilter = {
  //     name: 'Department',
  //     options: data.departments.map((department: any) => {
  //       return {
  //         name: department.name,
  //         value: department.id,
  //       };
  //     }),
  //   }
  //   setFilters((prev: any) => [
  //     ...prev.filter((filter: any) => filter.name !== 'Department'),
  //     departmentFilter
  //   ])
  // }
  console.log(getRoleMenus("Founder"))
  return (
    // <FounderContextProvider>
      <div className="w-full size-full md:flex">
        <MenuList menus={getRoleMenus("founder")} pathSegment='/dashboard/founder' pathPosition={3} />
        <div className="w-full">
          {/* <Suspense fallback={<div>Loading...</div>}> */}
            <FilterList filters={filters} setFilters={setFilters} />
          {/* </Suspense> */}
          {/* <FounderFilters data={ { universities: universities } } /> */}
          <div className="w-full h-full p-2 space-y-2 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    // </FounderContextProvider>
  )
}
