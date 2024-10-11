import Image from "next/image";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function AccountOverflowMenu() {
  const session: any = await auth();
  const user: any = await prisma.user.findFirst({
    select: {
      id: true,
      name_prefix: true,
      name_first: true,
      name_last: true,
      name_suffix: true,
      profile_picture_url: true,
    },
    where: {
      id: session.user.id,
    },
  });
  return (
    <div className="absolute right-0 top-0 bg-white shadow-lg rounded-md p-2 space-y-2">
      <div>
        <Image src={`/data/profilee_pictures/${user.profile_picture_url}`} alt="Profile Picture" width={40} height={40} className="rounded-full" />
        <span>{user.name_prefix} {user.name_first} {user.name_last} {user.name_suffix}</span>
      </div>
      <a href="/dashboard" className="flex items-center gap-2">
        <span className="material-symbols-outlined">dashboard</span>
        <span>Dashboard</span>
      </a>
      <a href="/settings" className="flex items-center gap-2">
        <span className="material-symbols-outlined">person</span>
        <span>Settings</span>
      </a>
      <a href="/logout" className="flex items-center gap-2">
        <span className="material-symbols-outlined">logout</span>
        <span>Logout</span>
      </a>
    </div>
  );
}
