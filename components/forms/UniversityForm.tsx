// Form // Modal

import { university } from "@prisma/client"
import { createUniversity, updateUniversity } from '@/actions/university'
import CreateForm from '@/components/ui/advanced/CreateForm'

export default async function UniversityForm({
  mode="create",
  data
}: {
  mode?: string,
  data?: university
}) {
  const fields: any[] = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      defaultValue: data ? data.name : '',
      // hidden: false,
      // required: true,
      // defaultValue: '',
    },
    {
      type: 'text',
      label: 'Name Short',
      name: 'name_short',
      defaultValue: data ? data.name_short : '',
      // hidden: false,
      // required: true,
      // defaultValue: '',
    },
  ]
  return <CreateForm objectName='University' fields={fields} serverAction={mode == "create" ? createUniversity : updateUniversity} />
}
