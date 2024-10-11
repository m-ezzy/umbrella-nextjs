"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { course } from "@prisma/client"
import { useStudentContext } from "@/contexts/StudentContext"
import FilterList from "../ui/advanced/FilterList"

export default function StudentFilters({ data, dataset }: any) {
  const [currentMenu2, setCurrentMenu2]: any = useState("courses")
  const currentRoute: string = usePathname().split("/")[3]
  if(currentMenu2 == null && currentMenu2 != currentRoute) {
    // setCurrentMenu2(currentRoute);
  }

  const { currentMenu, setCurrentMenu, filters, setFilters, semester, setSemester }: any = useStudentContext()

  const filtersDetails: any = {
    enrollments: ["University", "Department", "Degree"],
    courses: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor"],
    teaching: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor"],
    timetable: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor", "Weekday", "Time", "Room"],
    schedule: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor", "Weekday", "Time", "Room", "EventType"],
    sessions: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor", "Weekday", "Time", "Room", "Type"],
    attendance: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor", "Weekday", "Time", "Room", "Type"],
    assignments: ["University", "Department", "Degree", "Syllabus", "Semester", "Course", "Professor", "Weekday", "Time", "Room", "Type"],
  }

  // let filterToShow: any = filtersDetails[currentMenu2]?.map((item: any) => console.log(item));

  let semesters: any = new Set()
  data.forEach((enrollment: any) => {
    enrollment.batch.syllabus.courses.forEach((course: course) => {
      semesters.add(course.semester)
    })
  })
  const semestersArray: any = Array.from(semesters).map((semester: any) => ({ id: semester, name: semester }))

  let universities: any = new Set()
  let departments: any = new Set()
  let degrees: any = new Set()
  let syllabuses: any = new Set()
  let batches: any = new Set()
  let divisions: any = new Set()
  let courses: any = new Set()
  let professors: any = new Set()

  data.forEach((enrollment: any) => {
    universities.add(enrollment.batch.syllabus.degree.department.university.name)
    departments.add(enrollment.batch.syllabus.degree.department.name)
    degrees.add(enrollment.batch.syllabus.degree.name)
    syllabuses.add(enrollment.batch.syllabus.year_effective)
    batches.add(enrollment.batch.start_year)
    divisions.add(enrollment.division.name)
    enrollment.batch.syllabus.courses.forEach((course: course) => {
      courses.add(course.name)
    })
  })

  return (
    <>
      {/* <FilterList filters={filters} setFilters={setFilters} /> */}
      {/* <UniversityFilter setDepartment={setDepartment} /> */}
      {/* <DepartmentFilter setDegree={setDegree} /> */}
      {/* <DegreeFilter /> */}
      {/* <SyllabusFilter /> */}
      {/* <BatchFilter /> */}
      {/* <DivisionFilter /> */}
      {/* { showDivision && <RecordsFilter label="Division" options={divisions} selected={division} setter={setDivision} valueType="number" /> } */}
      {/* { filtersDetails[currentMenu2]?.includes("Semester") && <RecordsFilter label="Semester" options={semestersArray} selected={semester} setter={setSemester} valueType="number" /> } */}
      {/* <RecordsFilter label="Course" options={courses} selected={course} setter={setCourse} /> */}
      {/* <CourseFilter /> */}
      {/* <ProfessorFilter /> */}
    </>
  )
}
