"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import RecordsFilter from "@/components/ui/RecordsFilter";
import { useAdminContext } from "@/contexts/AdminContext";
import Filter from "../ui/Filter";
import FilterList from "../ui/FilterList";

export default function AdminFilters({ filters, dataset }: any) {
  const { filters2, setFilters, selectedFilters, setSelectedFilters }: any = useAdminContext();

  const filtersToApplyBySelectedMenu: any = {
    enrollments: ["University", "Department", "Degree"],
    courses: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor"],
    teaching: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor"],
    timetable: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor", "Weekday", "Time", "Room"],
    schedule: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor", "Weekday", "Time", "Room", "EventType"],
    sessions: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor", "Weekday", "Time", "Room", "Type"],
    attendance: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor", "Weekday", "Time", "Room", "Type"],
    assignments: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor", "Weekday", "Time", "Room", "Type"],
  };
  // const items: any = filters.map((filter: any) => {
  //   let options:any = dataset.map((item: any) => {
  //     return { name: item[filter.name_field], value: item[filter.value_field] };
  //   });
  //   return <Filter key={filter.label} label={filter.label} options={options} selectedValues={selectedFilters[filter.label]} setSelectedValues={setSelectedFilters} />
  // });
  const filtersUpdated: any = filters.map((filter: any) => {
    let options:any = dataset.map((item: any) => {
      return { name: item[filter.name_field], value: item[filter.value_field] };
    });
    return {
      name: filter.name,
      options: options,
      selectedValues: selectedFilters[filter.label],
      setSelectedValues: setSelectedFilters,
    };
  });
  return (
    <div className="w-full border-b">
      {/* {items} */}
      <FilterList filters={filtersUpdated} setFilters={setSelectedFilters} />
    </div>
  );
}
