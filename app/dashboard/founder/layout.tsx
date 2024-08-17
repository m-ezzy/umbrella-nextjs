import { ReactNode } from 'react'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import CreateButton from '@/components/ui/CreateButton';

export default async function Layout({ children, params }: { children: ReactNode, params: any }) {
  const session:any = await auth();

  const founderUniversity: any[] = await prisma.university.findMany({
    where: {
      user_id: session.user.id,
    },
  });
  const founderUniversityList = founderUniversity.map((item: any) => (
    <li key={item.id} className="border rounded-md p-2 min-w-44">
      <Link href={`/dashboard/founder`}>
        <p>University: {item.name}</p>
      </Link>
    </li>
  ));
  return (
    <div className='w-full'>
      <div className=''>
        <CreateButton text="University" />
      </div>
      {founderUniversityList}
      {children}
    </div>
  )
}
