import { auth } from '@/auth';
import { getCourses } from '@/models/Professor';
import MenuList from '@/components/MenuList';

export default async function Page() {
  const session:any = await auth();
  const courses = await getCourses(session.user.id);

  const courseItems = courses.map(({ course_id, course_name }: any) => {
    return <div key={course_id}>{course_name}</div>
  });
  return (
    <div className='border-r'>
      <MenuList menus={courses.map((course: any) => course.course_name)} pathSegment='/professor/courses' />
      {/* <h1>Courses</h1>
      {courseItems} */}
    </div>
  );
}
