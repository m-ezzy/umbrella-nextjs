"use client"
// "use server"

import { useEffect, useState } from "react"
// import { usePathname } from "next/navigation"
import useSWR from "swr"
// import prisma from "@/lib/prisma"
// import { auth } from "@/lib/auth"
import fetcher from "@/lib/fetcher"
import { useAdminContext } from "@/contexts/AdminContext"
import FilterList from "@/components/ui/advanced/FilterList"
import { entityRelationships } from "@/constants/entityRelationships"
import UniversityFilter from "../selectors/UniversityFilter"

export default function AdminFilters({ lastSelectedFilter, initialData }: any) {
  const { menu, setMenu, filters, setFilters, lastcChangedFilter, setLastChangedFilter }: any = useAdminContext()



























  const [fetchSyllabus, setFetchSyllabus] = useState(false)
























  let university_id = filters.find((filter: any) => filter.name === "university")?.options.find((option: any) => option.selected)?.value;
  const department_id = 0;
  const degree_id = 0;
  const syllabus_id = 0;
  const batch_id = 0;
  const division_id = 0;
  const course_id = 0;
  const professor_id = 0;
  const semester = 0;











  // useEffect(() => {
  //   let universities = initialData.map((data: any) => data.degree.department.university);
  //   let uniqueUniversities = new Set(universities.filter((u: any) => u.id));
  //   let selectedUniversityId = universities[universities.length - 1].id;
  //   let departments = initialData.filter((data: any) => data.degree.department.university.id === selectedUniversityId).map((data: any) => data.degree.department);
  //   let selectedDepartmentId;
  //   const degrees = initialData.map((data: any) => data.degree);
  //   let uniqueDepartments = new Set(departments.map((department: any) => department.id));

  //   setUniversity((prev: any) => {
  //     return {
  //       ...prev,
  //       options: universities.map((university: any) => ({ name: university.name, value: university.id, selected: university.id == selectedUniversityId }) ),
  //     };
  //   });
  //   setDepartment((prev: any) => {
  //     return {
  //       ...prev,
  //       options: departments.map((department: any) => ({ name: department.name, value: department.id }) ),
  //     };
  //   });
  //   setDegree((prev: any) => {
  //     console.log("degrees", prev);

  //     return {
  //       ...prev,
  //       options: degrees.map((degree: any, index: number) => {
  //         return { name: degree.name, value: degree.id, selected: index === degrees.length - 1 };
  //       }),
  //     };
  //   });

  //   // if(filters.find((filter: any) => filter.label === "Degree") === undefined) {
  //     setFilters((prev: any) => {
  //       // const universityOptions = initialData.map((data: any) => ({ name: data.university_name, value: data.university_id }));
  //       return [
  //         // ...prev,
  //         {
  //           label: "University",
  //           name: "university_id",
  //           options: initialData.map((data: any, index: number) => ({ name: data.degree.department.university.name, value: data.degree.department.university.id, selected: index == initialData.length - 1 }) ),
  //         },
  //         {
  //           label: "Department",
  //           name: "department_id",
  //           options: initialData.map((data: any) => ({ name: data.degree.department.name, value: data.degree.department.id })),
  //         },
  //         {
  //           label: "Degree",
  //           name: "degree_id",
  //           options: initialData.map((data: any) => ({ name: data.degree.name, value: data.degree.id })),
  //         },
  //       ];
  //     });
  //     // setUniversity((prev: any) => initialData[0]);
  //     // setDepartment((prev: any) => initialData[0]);
  //     // setDegree((prev: any) => initialData[0]);
  //   // }
  // }, [university_id, department_id, degree_id]);

























  useEffect(() => {
    // setUniversity((prev: any) => {
    //   return {
    //     ...prev,
    //     options: initialData.universities.map((university: any) => ({ name: university.name, value: university.id }) ),
    //   };
    // });
    setFilters((prev: any) => {
      return prev.map((filter: any, index: number) => {
        // console.log("filters", prev);
        // if(filter.name === "university") {
        //   return {
        //     ...filter,
        //     options: initialData.universities.map((university: any) => ({ name: university.name, value: university.id, selected: index == initialData.universities.length - 1 }) ),
        //   };
        // }
        if(filter.name == "degree") {
          return {
            ...filter,
            options: initialData.degrees.map((degree: any) => ({ name: degree.name_short, value: degree.id, selected: index == initialData.degrees.length - 1 }) ),
          };
        }
        return filter;
      });
    });
  }, []);

  let { isLoading, error, data: data } = useSWR(`/api/objects/syllabus?degree_id=${degree_id}`);

  useEffect(() => {
    if(data) {
      setFilters((prev: any) => {
        return prev.map((filter: any) => {
          if(filter.name == "syllabus") {
            return {
              ...filter,
              options: data.map((syllabus: any) => ({ name: syllabus.year_effective, value: syllabus.id }) ),
            };
          }
          return filter;
        });
      });
    }
  }, [isLoading]);










  // to fetch university data
  // useEffect(() => {
  //   if(!university_id && initialData.length !== 0) {
  //     let universities: any = new Set(initialData.map((admin: any) => admin.degree.department.university.id));
  //     universities = Array.from(universities).map((id: any) => initialData.find((admin: any) => admin.degree.department.university.id === id).degree.department.university);
      
  //     setUniversity((prev: any) => {
  //       return {
  //         ...prev,
  //         options: universities.map((university: any) => ({ name: university.name, value: university.id })),
  //       }
  //     });
  //     setFilters((prev: any) => {
  //       return prev.map((filter: any) => {
  //         if(filter.label === "University") {
  //           return {
  //             ...filter,
  //             options: universities.map((university: any) => ({ name: university.name, value: university.id })),
  //           };
  //         }
  //         return filter;
  //       });
  //     });
  //   }
  // }, []);

  // to fetch department data
  useEffect(() => {
    // async function fetcher() {
    //   const res: any = await fetch(`/api/objects/department?role=admin&university_id=${university_id}`);
    //   const data: any = await res.json();
    //   const departments: any = data.data;

    //   setDepartment((prev: any) => {
    //     return {
    //       ...prev,
    //       options: departments.map((department: any) => ({ name: department.name, value: department.id })),
    //     };
    //   });
    //   setFilters((prev: any) => {
    //     if(prev.find((filter: any) => filter.label === "Department") === undefined) {
    //       return [
    //         ...prev,
    //         {
    //           label: "Department",
    //           name: "department_id",
    //           options: departments.map((department: any) => ({ name: department.name, value: department.id })),
    //         },
    //       ];
    //     } else {
    //       return prev.map((filter: any) => {
    //         if(filter.label === "Department") {
    //           return {
    //             ...filter,
    //             options: departments.map((department: any) => ({ name: department.name, value: department.id })),
    //           };
    //         }
    //         return filter;
    //       });
    //     }
    //   });
    // }
    // if(university_id) {
    //   fetcher();
    // } else {
    //   setDepartment((prev: any) => {
    //     return {
    //       ...prev,
    //       options: [],
    //     };
    //   });
    //   setFilters((prev: any) => {
    //     return prev.map((filter: any) => {
    //       if(filter.label === "Department") {
    //         return {
    //           ...filter,
    //           options: [],
    //         };
    //       }
    //       return filter;
    //     });
    //   });
    // }
  }, [university_id]);

  // to fetch degree data
  useEffect(() => {
  }, [university_id, department_id]);

  // to fetch syllabus data
  useEffect(() => {
    setFetchSyllabus(true);
  }, [degree_id, semester]);

  // to set course data
  useEffect(() => {
  }, [degree_id]);

  // to fetch batch data
  useEffect(() => {
  }, [university_id, department_id, degree_id, syllabus_id, semester]);

  // to fetch division data
  useEffect(() => {
  }, [batch_id]);

  // to fetch professor data
  useEffect(() => {
  }, [batch_id, division_id, course_id]);










  if(fetchSyllabus) {
    // let response: any = useSWR("/api/objects/syllabus", fetcher, {});
    // setFetchSyllabus(false);
  }


























  // fetch syllabus
  // let { data }: any = useSWR("/api/objects/syllabus", fetcher, {});





















  // const session: any = await auth();
  // const lastSelectedFilterIndex: number = filters.findIndex((filter: any) => filter.name === lastSelectedFilter);
  const lastSelectedFilterIndex: number = filters.findIndex((filter: any) => filter.lastSelected);
  let newFilters: any = [];

  // if(filters.length === 0) {
  //   let admins: any = await prisma.admin.findMany({
  //     include: {
  //       degree: {
  //         include: {
  //           department: {
  //             include: {
  //               university: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //     where: { user_id: session.user.id },
  //   })
  //   .catch((error: any) => ({ error }) );

  //   newFilters = [
  //     {
  //       name: "University",
  //       label: "University",
  //       name_field: "name",
  //       value_field: "id",
  //       options: admins.map((admin: any) => ({ name: admin.degree.department.university.name, value: admin.degree.department.university.id })),
  //       selectedValues: [],
  //     },
  //     {
  //       name: "Department",
  //       label: "Department",
  //       name_field: "name",
  //       value_field: "id",
  //       options: admins.map((admin: any) => ({ name: admin.degree.department.name, value: admin.degree.department.id })),
  //       selectedValues: [],
  //     },
  //     {
  //       name: "Degree",
  //       label: "Degree",
  //       name_field: "name",
  //       value_field: "id",
  //       options: admins.map((admin: any) => ({ name: admin.degree.name, value: admin.degree.id })),
  //       selectedValues: [],
  //     },
  //   ];
  // } else if(filters.find((filter: any) => filter.name === "University")) {
  //   let departments: any = await prisma.department.findMany({
  //     include: {
  //       university: true,
  //     },
  //   })
  //   .catch((error: any) => ({ error }) );

  //   newFilters = [
  //     {
  //       name: "Department",
  //       label: "Department",
  //       name_field: "name",
  //       value_field: "id",
  //       options: departments.map((department: any) => ({ name: department.name, value: department.id })),
  //       selectedValues: [],
  //     },
  //   ];
  // } else if(filters.find((filter: any) => filter.name === "Department")) {
  //   let degrees: any = await prisma.degree.findMany({
  //     include: {
  //       department: {
  //         include: {
  //           university: true,
  //         },
  //       },
  //     },
  //   })
  //   .catch((error: any) => ({ error }) );

  //   newFilters = [
  //     {
  //       name: "Degree",
  //       label: "Degree",
  //       name_field: "name",
  //       value_field: "id",
  //       options: degrees.map((degree: any) => ({ name: degree.name, value: degree.id })),
  //       selectedValues: [],
  //     },
  //   ];
  // } else if(filters.find((filter: any) => filter.name === "Degree")) {
  //   let syllabuses: any = await prisma.syllabus.findMany()
  //   .catch((error: any) => ({ error }) );

  //   newFilters = [
  //     {
  //       name: "Syllabus",
  //       label: "Syllabus",
  //       name_field: "name",
  //       value_field: "id",
  //       options: syllabuses.map((syllabus: any) => ({ name: syllabus.name, value: syllabus.id })),
  //       selectedValues: [],
  //     },
  //   ];
  // } else if(filters.find((filter: any) => filter.name === "Syllabus")) {
  // }

























  // if(lastcChangedFilter) {
  //   setFilters((prev: any) => {
  //     let filtered = dataset.filter((row) => {
  //       entityRelationships.forEach((filter) => {
  //         if(filter.name == lastcChangedFilter) {
  //           filtered = filtered.filter((row) => {
  //             return row[filter.name] == selectedValue;
  //           });
  //         }
  //       });
  //     })
  //   }
  //   setLastChangedFilter(null)
  // }








































  // const { filters2, setFilters, selectedFilters, setSelectedFilters }: any = useAdminContext();

  const filtersToApplyBySelectedMenu: any = {
    syllabuses: ["University", "Department", "Degree", "Syllabus", "Semester", "Course"],
    courses: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor"],
    batches: ["University", "Department", "Degree", "Syllabus", "Semester", "Course"],
    divisions: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Batch", "Division"],
    enrollments: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Batch", "Division"],
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
  
  // const filtersUpdated: any = filters.map((filter: any) => {
  //   let options:any = dataset.map((item: any) => {
  //     return { name: item[filter.name_field], value: item[filter.value_field] };
  //   });
  //   return {
  //     name: filter.name,
  //     options: options,
  //     selectedValues: selectedFilters[filter.label],
  //     setSelectedValues: setSelectedFilters,
  //   };
  // });

  return (
    <>
      <FilterList filters={filters} setFilters={setFilters} setLastChangedFilter={setLastChangedFilter} />
      <div>
      <UniversityFilter />
      <DepartmentFilter />
      {/* <DegreeFilter /> */}
      {/* <SyllabusFilter /> */}
      {/* <SemesterFilter /> */}
      {/* <CourseFilter /> */}
      {/* <ProfessorFilter /> */}
      {/* <WeekdayFilter /> */}
      {/* <TimeFilter /> */}
      {/* <RoomFilter /> */}
      {/* <EventTypeFilter /> */}
      {/* <TypeFilter /> */}
      </div>
    </>
  )
}
