import { batch } from "@prisma/client"
import { createBatch } from "@/actions/batch"
import { InputFormField } from "@/components/ui/form_controls/FormInput"
import CreateForm from "@/components/ui/advanced/CreateForm"

export default function BatchForm({
  mode,
  data,
  syllabus_id,
}: {
  mode?: string,
  data?: any,
  syllabus_id?: number,
}) {
  let fields: any[] = [
    {
      type: 'hidden',
      name: 'id',
      defaultValue: data ? data.id : '',
    },
    {
      type: 'text',
      label: 'Syllabus Year Effective',
      name: 'syllabus_id',
      defaultValue: data ? data.syllabus_id : '',
    },
    // {
    //   type: 'text',
    //   label: 'Syllabus Effective from Year',
    //   name: 'year_effective',
    //   value: filters.find((filter: any) => filter.label === 'Syllabus')?.options.find((option: any) => option.selected)?.name,
    //   readOnly: true,
    // },
    {
      type: 'number',
      label: 'Start Year',
      name: 'start_year',
      defaultValue: data ? data.start_year : '',
    },
    {
      type: 'number',
      label: 'Finish Year',
      name: 'finish_year',
      defaultValue: data ? data.finish_year : '',
      required: false,
    },
    {
      type: 'select',
      label: 'Current Semester',
      name: 'current_semester',
      options: Array({ length: data.duration_in_semesters }).map(s => ({ name: s, value: s })),
      defaultValue: data ? data.current_semester : '',
      required: false,
    },
  ]
  return <CreateForm objectName="Batch" fields={fields} serverAction={createBatch} />
}
