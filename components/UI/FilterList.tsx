"use client";
import Filter from "@/components/ui/Filter";

export default function FilterList({ filters, setFilters }: { filters: any[], setFilters: any }) {
  const filterItems = filters.map((filter: any) => {
    return <Filter key={filter.name} {...filter} setFilters={setFilters} />;
  });
  return (
    <div className='border-b p-2 gap-2 overflow-x-auto md:flex'>
      {filterItems}
    </div>
  );
}
