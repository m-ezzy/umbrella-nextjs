'use client'

import { createSyllabus, deleteSyllabus, deleteMultipleSyllabus } from '@/actions/syllabus'
import { InputFormField } from '@/components/ui/form_controls/FormInput'
import CreateForm from '@/components/ui/advanced/CreateForm'

export default function SyllabusForm({ data, syllabus_id, degree_id }: any) {
  const fields: InputFormField[] = [
    // {
    //   type: "select",
    //   label: "Degree",
    //   name: "degree_id",
    //   options: syllabuses?.map((s: any) => ({ value: s.degree.id, name: s.degree.name_short })),
    // },
    // {
    //   type: "text",
    //   label: "Degree",
    //   name: "degree_name_short",
    //   value: filters.find((filter: any) => filter.name === "degree")?.options.find((option: any) => option.selected)?.name,
    //   readOnly: true,
    // },
    {
      type: "hidden",
      name: "degree_id",
      defaultValue: degree_id,
    },
    {
      type: "text",
      label: "Code",
      name: "code",
    },
    {
      type: "number",
      label: "Year Effective",
      name: "year_effective",
    },
    {
      type: "number",
      label: "Duration in semesters",
      name: "duration_semesters",
    },
  ]
  return <CreateForm objectName="Syllabus" fields={fields} serverAction={createSyllabus} buttonDisabled={degree_id ? false : true} />
}
