import { ReactNode } from 'react';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';

export default async function Layout({ children }: { children: ReactNode }) {
  const session: any = await auth();
  
  // const universityManagers: any = await prisma.heads.findMany({
  //   include: {
  //     department: true,
  //   },
  //   where: {
  //     user_id: session.user.id,
  //   }
  // });
  return <></>;
}
