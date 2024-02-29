import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="conatiner">
      <nav className="bg-white mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex p-2 items-center justify-start justify-items-start gap-2">
        <div className="flex">
          <Image src="/assets/images/umbrella-icon-19.png" className="flex" width={50} height={50} alt="brand logo" />
          {/* <Image src="/assets/images/black-umbrella-png-9.png" className="flex" width={60} height={60} /> */}
          {/* <div className="font-normal text-black my-auto">Umbrella</div> */}
        </div>
        <div className="flex space-x-4">
          <Link href="/dashboard" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</Link>
          <Link href="/team" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</Link>
          <Link href="/projects" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</Link>
          <Link href="/calendar" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</Link>
        </div>
        <div className="relative ml-3">
          <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </button>
        </div>
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Dashboard</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Logout</a>
        </div>
      </nav>
      <main>
        <p className="font-8xl">Welcome to the Home!</p>
      </main>
    </div>
  );
}
