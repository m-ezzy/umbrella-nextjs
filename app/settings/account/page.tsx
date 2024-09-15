import { deleteAccount } from "@/actions/user"
import DeleteForm from "@/components/ui/DeleteForm";

export default async function Page() {
  return(
    <div className="space-y-2">
      <div className="p-2">
        {/* <form action={deleteAccount}>
          <button type="submit">Delete Account</button>
        </form> */}
        <DeleteForm fields={[]} serverAction={deleteAccount} objectName='Account' />
      </div>
    </div>
  );
}
