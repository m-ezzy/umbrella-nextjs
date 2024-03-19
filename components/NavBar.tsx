import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";

export default async function NavBar() {
  const session: any = await auth();
  // console.log("session".bgCyan, session);

  return (
    <nav className="bg-violet-300 sticky top-0 left-0 right-0 p-2 flex justify-between items-center">
      <Link href="/" className="flex gap-2 items-center active:scale-125 active:transition-all">
        <Image src="/assets/images/black-umbrella-png-9.png" alt="Umbrella" width={40} height={40} className="" />
        <span>| {process.env.UNIVERSITY_NAME}</span>
      </Link>
      <div className="flex gap-2 items-center">
        <form>
          <input type="text" placeholder="search" />
        </form>
        <form>
          <button>
            {/* <Image src="/assets/images/ui/mic.png" alt="voice recognition" width={30} height={30} className="border" /> */}
            <span className="material-symbols-outlined">mic</span>
          </button>
        </form>
      </div>
      <span className="flex items-center gap-2">
        <span className="material-symbols-outlined">notifications</span>
        {session?.user ? <Link href={"/account"}>Account</Link> : <Link href={"/login"}>Login</Link>}
      </span>
    </nav>
  );
}
