// "use client";
// import { useState } from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { updateUser } from "@/actions/user";

export default async function Page() {
  const session:any = await auth();
  const user:any = session.user;

  // const [user, setUser] = useState(session.user);

  return(
    <form action={updateUser} encType="multipart/form-data" className="p-2 block *:block"> {/* /api/user/upload/pp */}
      <Image src={user.profile_picture} alt="profile picture" width={200} height={200} className="my-4" />

      <label htmlFor="profile_picture">Profile Picture</label>
      <input type="file" placeholder="Profile Picture" name="profile_picture" className="file:bg-violet-400 file:border-0 file:rounded-md file:p-2" />

      <label htmlFor="user_id">User ID</label>
      <input type="text" placeholder="User ID" name="user_id" value={user.user_id} />

      <label htmlFor="username">Username</label>
      <input type="text" placeholder="Username" name="username" value={user.username} />

      <label htmlFor="password">Password</label>
      <input type="text" placeholder="Password" name="password" value={user.password} />

      <label htmlFor="name_prefix">Name Prefix</label>
      <input type="text" placeholder="Name Prefix" name="name_prefix" value={user.name_prefix} />

      <label htmlFor="name_first">First Name</label>
      <input type="text" placeholder="First Name" name="name_first" value={user.name_first} />

      <label htmlFor="name_middle">Middle Name</label>
      <input type="text" placeholder="Middle Name" name="name_middle" value={user.name_middle} />

      <label htmlFor="name_sur">Last Name</label>
      <input type="text" placeholder="Last Name" name="name_sur" value={user.name_sur} />

      <label htmlFor="name_suffix">Name Suffix</label>
      <input type="text" placeholder="Name Suffix" name="name_suffix" value={user.name_suffix} />

      <label htmlFor="phone_number">Phone</label>
      <input type="text" placeholder="Phone Number" name="primary_phone_number" value={user.primary_phone} />

      <label htmlFor="email">Email</label>
      <input type="text" placeholder="Email" name="email" value={user.primary_email} />

      <label htmlFor="gender">Gender</label>
      <input type="text" placeholder="gender" name="gender" value={user.gender} />

      <label htmlFor="date_of_birth">Date of Birth</label>
      <input type="text" placeholder="Date of Birth" name="date_of_birth" value={user.date_of_birth} />

      <button className="mt-2">Update</button>
    </form>
  );
}
