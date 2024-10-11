import { deleteAdmin } from "@/actions/admin"
import ListTable from "@/components/ui/advanced/ListTable"
import DeleteForm from "@/components/ui/advanced/DeleteForm"

export default function AdminList({ data }: { data: any[] }) {
  let dataset: any[] = data.map((admin: any) => {
    return {
      id: admin.id,
      Title: admin.title,
      Description: admin.description,
      Deadline: admin.deadline,
      Format: admin.format,
      Delete: <DeleteForm objectName="Admin" id={degree.id} serverAction={deleteAdmin} />,
    }
  })
  return <ListTable data={dataset} />
}
