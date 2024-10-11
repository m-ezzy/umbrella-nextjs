import prisma from "@/lib/prisma"
import { auth } from '@/lib/auth'
import TimetableView from '@/components/modules/TimetableView'
import { Prisma } from "@prisma/client"

export default async function Page({
  params,
  searchParams,
}: {
  params: any,
  searchParams: string,
}) {
  // 1. search params
  console.log(searchParams)
  // 2. recat context state
  console.log()





  const degree_id = 0
  const batch_id = 0
  const division_id = 0
  const batch_year = 0
  const division_name = null
  const course_id = 0
  const semester = 0

  // async function setSemester(event: any) {
  //   "use server";
  //   const semester = event.target.elements.semester.value;
  // }
  
  return (
    <>
      {/* <form action={setSemester}>
        <select name="semester" id="semester">
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
          <option value="5">Semester 5</option>
          <option value="6">Semester 6</option>
          <option value="7">Semester 7</option>
          <option value="8">Semester 8</option>
        </select>
        <input type="submit" value="Submit" />
      </form> */}
      <TimetableView data={data} showDegree={false} showProfessor={true} />
    </>
  )
}
