import TeachingList from './TeachingList';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export default async function Page({ params }: {params: { enrollment_id: string }}) {
  let session: any = await auth();

  let teaching: any = await prisma.teaching.findMany({
    include: {
      course: {
        include: {
          syllabus_course: true,
        },
      },
      professor: true,
    },
    where: {
      division: {
        enrollments: {
          some: {
            enrollment_id: parseInt(params.enrollment_id),
          },
        },
      },
    },
  });
  // console.log(teaching);

  return (
    <div className='w-full p-2 overflow-auto'>
      <TeachingList teaching={teaching} />
    </div>
  );
}
