import prisma from "@/lib/prisma";
import { auth } from '@/lib/auth';
import { FounderContextProvider } from '@/contexts/FounderContext';
import FounderLayout from '@/components/layouts/FounderLayout';

// you can query database here and send it to child components during initial render because it is a server component
// you can't do that in menu's layout or page files because they are client components. they don't have access to the filters
// so you need to fetch that data from client components using useEffect or useSWR

export default async function Layout({ children }: { children: any }) {
  const session:any = await auth();

  let founderUniversities: any[] = await prisma.university.findMany({
    // include: {
    //   _count: {
    //     select: { departments: true },
    //   },
    //   departments: true,
    // },
    where: {
      user_id: session.user.id,
    },
  });
  founderUniversities = founderUniversities.map((university: any) => {
    return {
      ...university,
      // departments: university.departments.length,
      // department_count: university._count.departments,
    };
  });
  let departments: any[] = await prisma.department.findMany({
    where: {
      university: {
        user_id: session.user.id,
      },
    },
  });
  return (
    <FounderContextProvider>
      <FounderLayout data={{ universities: founderUniversities, departments: departments }}>
        {children}
      </FounderLayout>
    </FounderContextProvider>
  );
}
