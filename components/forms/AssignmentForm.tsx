import { assignment, assignment_format } from "@prisma/client"
import { createAssignment, updateAssignment } from "@/actions/assignment"
import CreateForm from "@/components/ui/advanced/CreateForm"

// mode - create, edit
export default function AssignmentForm({
  mode,
  data,
}: any) {
  const fields: any[] = [
    {
      type: "text",
      label: "Title",
      name: "title",
      defaultValue: data.title ?? "",
    },
    {
      type: "text",
      label: "Description",
      name: "description",
      defaultValue: data.description,
    },
    {
      type: "select",
      label: "Current Semester",
      name: "current_semester",
      required: false,
      options: Object.keys(assignment_format).map(af => ({ name: af, value: af })),
    },
    {
      type: "select",
      label: "Graded",
      name: "graded",
      required: false,
    },
  ]
  // mode == "create" ? <CreateForm> : <EditForm>
  return <CreateForm objectName="Assignment" fields={fields} serverAction={createAssignment} />
}
