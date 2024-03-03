"use client";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { logout } from "@/lib/authThings";

export default function Account({ user }: any) {
  const handleClick = () => {
    logout();
    redirect("/login");
  };
  return (
    <div className="p-4 gap-4">
      <form className="text-black">
        <div className="flex gap-2">
          <div className="text-white grid items-center">
            <label htmlFor="id">User ID</label>
            <label htmlFor="username">Username</label>
            <label htmlFor="password">Password</label>
            <label htmlFor="firstname">First Name</label>
            <label htmlFor="lastname">Last Name</label>
            <label htmlFor="phone">Phone</label>
            <label htmlFor="email">Email</label>
            <label htmlFor="">Google Email</label>
            <label htmlFor="">Github Username</label>
            <label htmlFor="">Gender</label>
            <label htmlFor="">Date of Birth</label>
          </div>
          <div className="grid">
            <input type="text" placeholder="User ID" value={user.id} />
            <input type="text" placeholder="Username" value={user.username} />
            <input type="text" placeholder="Password" value={user.password} />
            <input type="text" placeholder="First Name" value={user.firstname} />
            <input type="text" placeholder="Last Name" value={user.lastname} />
            <input type="text" placeholder="Phone" value={user.contact_no} />
            <input type="text" placeholder="Email" value={user.primary_email} />
            <input type="text" placeholder="Google Email" value={user.google_email} />
            <input type="text" placeholder="Github Username" value={user.github_username} />
            <input type="text" placeholder="gender" value={user.gender} />
            <input type="text" placeholder="Date of Birth" value={user.date_of_birth} />
          </div>
        </div>
        <button className="btn border p-2 bg-white">Update</button>
      </form>
      <button className="bg-purple-500 hover:bg-purple-400 btn mt-2 border p-2" onClick={handleClick}>Logout</button>
    </div>
  );
}
