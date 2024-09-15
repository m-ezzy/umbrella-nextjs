"use client";
import { Suspense, useState } from "react";
import MenuList from '@/components/ui/MenuList';
import FilterList from "@/components/ui/FilterList";
import { founderMenus } from '@/constants/menus';
import { FounderContextProvider, useFounderContext } from "@/contexts/FounderContext";
import FounderFilters from '@/components/filters/FounderFilters';

export default function FounderLayout({ children, data }: any) {
  // const [filters, setFilters] = useState([]);
  const { filters, setFilters, render, setRender }: any = useFounderContext();

  console.log("44444444444444888888888888888888888888");
  console.log(filters);

  if(filters.find((filter: any) => filter.name === 'University') === undefined && data.universities) {
    let universityFilter = {
      name: 'University',
      options: data.universities.map((university: any) => {
        return {
          name: university.name,
          value: university.id,
        };
      }),
    }
    setFilters((prev: any) => [universityFilter]);
  }
  return (
    // <FounderContextProvider>
      <div className="w-full size-full md:flex">
        <MenuList menus={founderMenus} pathSegment='/dashboard/founder' pathPosition={3} />
        <div className="w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <FilterList filters={filters} setFilters={setFilters} />
          </Suspense>
          {/* <FounderFilters data={ { universities: universities } } /> */}
          {children}
        </div>
      </div>
    // </FounderContextProvider>
  );
}
