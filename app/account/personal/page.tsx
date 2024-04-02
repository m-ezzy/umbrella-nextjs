import ProfilePicture from "@/components/user/ProfilePicture";
import { updateUser } from "@/actions/user";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function Page() {
  const session:any = await auth();
  // const user:any = session.user;

  let user: any = await prisma.user.findUnique({
    where: { user_id: session.user.user_id },
  });

  return(
    <div className="block space-y-8">
      <ProfilePicture profile_picture_url={user.profile_picture_url} />

      <form action={updateUser} className="border-t p-2 grid grid-cols-4 gap-2">
        <label htmlFor="user_id">User ID</label>
        <input type="text" placeholder="User ID" name="user_id" value={user.user_id} readOnly />

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Username" name="username" defaultValue={user.username} />

        <label htmlFor="password">Password</label>
        <input type="text" placeholder="Password" name="password" defaultValue={user.password} />

        <label htmlFor="name_prefix">Name Prefix</label>
        <input type="text" placeholder="Name Prefix" name="name_prefix" defaultValue={user.name_prefix} />

        <label htmlFor="name_first">First Name</label>
        <input type="text" placeholder="First Name" name="name_first" defaultValue={user.name_first} />

        <label htmlFor="name_middle">Middle Name</label>
        <input type="text" placeholder="Middle Name" name="name_middle" defaultValue={user.name_middle} />

        <label htmlFor="name_sur">Last Name</label>
        <input type="text" placeholder="Last Name" name="name_sur" defaultValue={user.name_sur} />

        <label htmlFor="name_suffix">Name Suffix</label>
        <input type="text" placeholder="Name Suffix" name="name_suffix" defaultValue={user.name_suffix} />

        <label htmlFor="phone_number">Phone</label>
        <input type="text" placeholder="Phone Number" name="primary_phone_number" defaultValue={user.primary_phone} />

        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Email" name="email" defaultValue={user.primary_email} />

        <label htmlFor="gender">Gender</label>
        <select name="gender" defaultValue={user.gender}>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>

        <label htmlFor="date_of_birth">Date of Birth</label>
        <input type="date" placeholder="Date of Birth" name="date_of_birth" defaultValue={user.date_of_birth} />

        <button className="mt-2">Update</button>
      </form>
    </div>
  );
}
