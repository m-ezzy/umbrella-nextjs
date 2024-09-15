import ListTable from '@/components/ui/ListTable';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';

export default async function Page() {
  const session:any = await auth();
  const courses: any = await prisma.course.findMany({
    include: {
      chapters: true,
      divisions: true,
    },
    where: {
      teachings: {
        some: {
          professor_id: session.user.id,
        },
      },
    },
  })
  .catch(error => console.error(error));
  return (
    <div className='h-full'>
      {courses.length != 0 && <ListTable data={courses} />}
    </div>
  );
}
