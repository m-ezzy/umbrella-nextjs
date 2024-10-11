'use client'

import { Suspense } from 'react'
import Filter from '@/components/ui/advanced/Filter'

export default function FilterList({
  filters,
  setFilters,
  setLastChangedFilter,
}: {
  filters: any[],
  setFilters: any,
  setLastChangedFilter: any,
}) {
  const filterItems = filters.map((filter: any) => {
    return (
      // <Suspense key={filter.name} fallback={<div>Loading...</div>}>
        <Filter key={filter.name} {...filter} setFilters={setFilters} setLastChangedFilter={setLastChangedFilter} />
      // </Suspense>
    );
  });
  return (
    <div className='w-full border-b p-2 flex flex-wrap gap-2 md:overflow-x-auto md:flex-nowrap'>
      {filterItems}
    </div>
  );
}
