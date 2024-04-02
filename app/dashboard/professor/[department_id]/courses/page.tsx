import MenuList from '@/components/UI/MenuList';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export default async function Page({ params }: any) {
  const session:any = await auth();
  const courses = await prisma.course.findMany({
    include: {
      chapters: true,
      teaching: true,
    },
    where: {
      teaching: {
        some: {
          professor_id: session.user.user_id,
        },
      },
    },
  }).catch(error => console.error(error))

  const courseItems = courses?.map(({ course_id, course_name }: any) => {
    return <div key={course_id}>{course_name}</div>
  });
  return (
    <div className='border-r'>
      <MenuList menus={courses.map((course: any) => course.course_name)} pathSegment='/professor/courses' />
      {/* {courseItems} */}
    </div>
  );
}
