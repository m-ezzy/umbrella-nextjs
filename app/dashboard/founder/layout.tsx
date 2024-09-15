import { prisma } from '@/lib/db';
import { auth } from '@/auth';
import { FounderContextProvider } from '@/contexts/FounderContext';
import FounderLayout from '@/layouts/FounderLayout';

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
  return (
    <FounderContextProvider>
      <FounderLayout data={{ universities: founderUniversities }}>
        {children}
      </FounderLayout>
    </FounderContextProvider>
  );
}
