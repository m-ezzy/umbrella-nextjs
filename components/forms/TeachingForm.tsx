'use client'

import { createTeaching, deleteTeaching } from '@/actions/teaching'
import CreateForm from '@/components/ui/advanced/CreateForm'

export default function TeachingForm({ data }: any) {
  // if(batch or division)

  let fields: any[] = [
    {
      type: "text",
      label: "Batch Start Year",
      name: "start_year",
      value: data.start_year,
      readOnly: true,
    },
    {
      type: "text",
      label: "Division Name",
      name: "division_name",
      value: data.division_name,
      readOnly: true,
    },
    {
      type: "text",
      label: "Course Name",
      name: "course_name",
      value: data.course_name,
      readOnly: true,
    },
    {
      type: "text",
      label: "Professor Name",
      name: "professor_name",
      value: data.professor_name,
      readOnly: true,
    },
    {
      type: "hidden",
      name: "batch_id",
      defaultValue: data.batch_id,
    },
    {
      type: "hidden",
      name: "division_id",
      defaultValue: data.division_id,
    },
    {
      type: "hidden",
      name: "course_id",
      defaultValue: data.course_id,
    },
    {
      type: "hidden",
      name: "professor_id",
      defaultValue: data.professor_id,
    },
    {
      type: "hidden",
      name: "teaching_id",
      defaultValue: data.teaching_id,
    }
  ]
  return <CreateForm objectName="Teaching" fields={fields} serverAction={createTeaching} />
}
