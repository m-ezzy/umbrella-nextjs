import { auth } from "@/auth";

export default async function Page() {
  const session:any = await auth();
  console.log(session);
  const user:any = session.user;

  return(
    <form className="p-2 block *:block">
      <h3 className="bg-gray-400 p-2">Personal Information</h3>

      <label htmlFor="id">User ID</label>
      <input type="text" placeholder="User ID" value={user.id} />

      <label htmlFor="username">Username</label>
      <input type="text" placeholder="Username" value={user.username} />

      <label htmlFor="password">Password</label>
      <input type="text" placeholder="Password" value={user.password} />

      <label htmlFor="firstname">First Name</label>
      <input type="text" placeholder="First Name" value={user.firstname} />

      <label htmlFor="lastname">Last Name</label>
      <input type="text" placeholder="Last Name" value={user.lastname} />

      <label htmlFor="phone">Phone</label>
      <input type="text" placeholder="Phone" value={user.contact_no} />

      <label htmlFor="email">Email</label>
      <input type="text" placeholder="Email" value={user.primary_email} />

      <label htmlFor="">Gender</label>
      <input type="text" placeholder="gender" value={user.gender} />

      <label htmlFor="">Date of Birth</label>
      <input type="text" placeholder="Date of Birth" value={user.date_of_birth} />

      <button className="mt-2">Update</button>
    </form>
  );
}
