"use client";
import { useFounderContext } from "@/contexts/FounderContext";
import FilterList from "@/components/ui/FilterList";

export default function FounderFilters({ data }: any) {
  const { currentMenu, setCurrentMenu, filters, setFilters }: any = useFounderContext();
  return (
    <div className="w-full border border-b p-2">
      <FilterList filters={filters} setFilters={setFilters} />
    </div>
  );
}
