import { auth } from "@/auth";

export default async function Page() {
  const session:any = await auth();
  // console.log(session);
  const user:any = session.user;

  return(
    <form className="p-2 block *:block">
      <label htmlFor="">Google Email</label>
      <input type="text" placeholder="Google Email" value={user.google_email} />
      <button className="mt-2">Update</button>
    </form>
  );
}
