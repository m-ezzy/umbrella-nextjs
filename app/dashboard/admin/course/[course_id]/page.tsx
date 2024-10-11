// "use client"

import { Suspense, useEffect, useState } from "react"
import useSWR from "swr"
import { course_category, course_type } from "@prisma/client"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import fetcher from "@/lib/fetcher"
import { deleteCourse, updateCourse } from "@/actions/course"
import { useAdminContext } from "@/contexts/AdminContext"
import EditForm from "@/components/ui/advanced/EditForm"
import DeleteForm from "@/components/ui/advanced/DeleteForm"

export default async function Page({ params }: { params: { course_id: number } }) {
  // const [editMode, setEditMode] = useState(false)

  const session:any = await auth()

  const result: any = await prisma.course.findUnique({
    where: {
      id: params.course_id,
      syllabus: {
        degree: {
          admins: {
            some: {
              user_id: session.user.id,
            },
          },
        },
      },
    },
  })
  .then((course: any) => ({ course }) )
  .catch((error: any) => ({ error }) )

  const fields: any = [
    {
      type: "hidden",
      name: "id",
      value: params.course_id,
      readOnly: true,
    },
    {
      type: "text",
      label: "Code",
      name: "code",
      defaultValue: result.course.code,
      // readOnly: editMode,
    },
    {
      type: "text",
      label: "Name",
      name: "name",
      defaultValue: result.course.name,
      // readOnly: editMode,
    },
    {
      type: "text",
      label: "Name Short",
      name: "name_short",
      defaultValue: result.course.name_short,
      // readOnly: editMode,
    },
    {
      type: "number",
      label: "Semester",
      name: "semester",
      value: result.course.semester,
      // readOnly: editMode,
    },
    {
      type: "select",
      label: "Type",
      name: "type",
      value: result.course.type,
      options: Object.values(course_type),
    },
    {
      type: "select",
      label: "Category",
      name: "category",
      value: result.course.category,
      options: Object.values(course_category),
    },
    {
      type: "hidden",
      name: "syllabus_id",
      value: result.course.syllabus_id,
      readOnly: true,
    },
  ]












  const { data, error, isLoading, isValidating, cache, mutate }: any = useSWR("/api/objects/course", fetcher, {})

  // useEffect(() => {
  //   if (data) {
  //     setDataset(data.data)
  //   }
  // }, [isLoading])

  return (
    <div className="w-full h-full p-2 space-y-2">
      <EditForm fields={fields} serverAction={updateCourse} />
      <DeleteForm objectName="Course" id={params.course_id} serverAction={deleteCourse} />
    </div>
  )
}
