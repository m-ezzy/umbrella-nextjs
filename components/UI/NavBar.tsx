import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import data from "@/data/data.json";

export default async function Navbar() {
  const session: any = await auth();
  // console.log("session".bgCyan, session);

  return (
    <nav className="sticky top-0 left-0 right-0 border-b p-2 flex justify-between items-center">
      <Link href="/" className="flex gap-2 items-center"> {/* active:scale-125 active:transition-all */}
        <Image src="/assets/images/black-umbrella-png-9.png" alt="Umbrella" width={40} height={40} className="" />
        <span>| {data.university.name}</span>
      </Link>
      
      <div className="flex gap-2 items-center">
        <form>
          <input type="search" placeholder="search" />
        </form>
        <form>
          <button type="submit">
            {/* <Image src="/assets/images/ui/mic.png" alt="voice recognition" width={30} height={30} className="border" /> */}
            <span className="material-symbols-outlined">mic</span>
          </button>
        </form>
      </div>

      {session?.user ? (
        <span className="flex items-center gap-2">
          {/* <span className="material-symbols-outlined">notifications</span> */}
          <Link href={"/dashboard"} className="flex items-center gap-1">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link href={"/account"} className="flex items-center">
          <span className="material-symbols-outlined">person</span>
          <span>Account</span>
          </Link>
        </span>
      ) : (
        <Link href={"/login"} className="flex items-center gap-1">
          <span className="material-symbols-outlined">login</span>
          <span>Login</span>
        </Link>
      )}
    </nav>
  );
}
