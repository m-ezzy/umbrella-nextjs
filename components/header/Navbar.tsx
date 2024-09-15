import Image from "next/image"
import Link from "next/link"
import NavbarPublic from "@/components/header/NavbarPublic"
import NavbarDashboard from "@/components/header/NavbarDashboard"
import AccountOverflowMenu from "@/components/header/AccountOverflowMenu"
import { auth } from "@/auth"
// import data from "@/data/data.json"

export default async function Navbar() {
  const session: any = await auth()

  return (
    <nav className="bg-white sticky top-0 left-0 right-0 border-b p-2 flex justify-between items-center">
      <Link href="/" className="flex gap-2 items-center"> {/* active:scale-125 active:transition-all */}
        <Image src="/assets/images/umbrella-transparent.png" alt="Umbrella Logo" width={40} height={40} className="" />
        {/* <span className="border-l ps-2">{data.university.name}</span> */}
      </Link>

      {/* check if it is public route or dashboard route and display nav items accordingly */}
      {session?.user ? <NavbarDashboard /> : <NavbarPublic />}

      {session?.user ? (
        // <AccountOverflowMenu />
        <span className="flex items-center gap-2">
          {/* <span className="material-symbols-outlined">notifications</span> */}
          <Link href={"/dashboard"} className="flex items-center gap-1">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link href={"/settings"} className="flex items-center">
            <span className="material-symbols-outlined">person</span>
            <span>Settings</span>
          </Link>
        </span>
      ) : (
        <Link href={"/login"} className="flex items-center gap-1">
          <span className="material-symbols-outlined">login</span>
          <span>Login</span>
        </Link>
      )}
    </nav>
  )
}
