"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import ListTable from "@/components/ui/advanced/ListTable";

export default async function CourseDataFetcher({ filters }: any) {
  const session: any = await auth();
  
  let filterCourse = filters.find((filter: any) => filter.label == "Course")?.options.find((option: any) => option.selected);
  let filterSemester = filters.find((filter: any) => filter.label == "Semester")?.options.find((option: any) => option.selected);
  let filterSyllabus = filters.find((filter: any) => filter.label == "Syllabus")?.options.find((option: any) => option.selected);
  let filterProfessor = filters.find((filter: any) => filter.label == "Professor")?.options.find((option: any) => option.selected);
  let filterDegree = filters.find((filter: any) => filter.label == "Degree")?.options.find((option: any) => option.selected);
  let filterDepartment = filters.find((filter: any) => filter.label == "Department")?.options.find((option: any) => option.selected);
  let filterUniversity = filters.find((filter: any) => filter.label == "University")?.options.find((option: any) => option.selected);

  let whereObject: any = {};
  if(filterCourse) whereObject["id"] = Number(filterCourse.value);
  if(filterSemester) whereObject["semester"] = Number(filterSemester.value);
  if(filterSyllabus) whereObject["syllabus_id"] = Number(filterSyllabus);
  if(filterProfessor) whereObject["professor_id"] = Number(filterProfessor.value);
  if(filterDegree) whereObject["degree_id"] = Number(filterDegree.value);
  if(filterDepartment) whereObject["department_id"] = Number(filterDepartment.value);
  if(filterUniversity) whereObject["university_id"] = Number(filterUniversity.value);

  const result: any = await prisma.course.findMany({
    where: whereObject,
    // {
    //   syllabus: {
    //     degree: {
    //       department: {
    //         university: {
    //           id: Number(filterUniversity?.value),
    //         },
    //         id: Number(filterDepartment?.value),
    //       },
    //       id: Number(filterDegree?.value),
    //     },
    //     id: Number(filterSyllabus?.value),
    //   },
    //   id: Number(filterCourse?.value),
    // }
  });
  return (
    <ListTable data={result} />
  )
}
