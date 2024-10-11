import { deleteAccount } from "@/actions/user"
import DeleteForm from "@/components/ui/advanced/DeleteForm";

export default async function Page() {
  return(
    <div className="p-2 space-y-2">
      {/* <form action={deleteAccount}>
        <button type="submit">Delete Account</button>
      </form> */}
      <DeleteForm objectName='Account' fields={[]} serverAction={deleteAccount} />
    </div>
  );
}
