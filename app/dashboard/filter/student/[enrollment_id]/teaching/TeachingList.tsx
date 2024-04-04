import Link from 'next/link';

export default async function TeachingList({ teaching }: any) {
  const teachingItems = teaching.map((item: any) => (
    <div key={item.teaching_id} className='border-b p-2 grid grid-cols-3'>
      <div>{item.course.syllabus_course[0].course_semester}</div>
      <div>{item.course.course_name}</div>
      <div>{item.professor.name_prefix} {item.professor.name_first} {item.professor.name_sur}</div>
      <div>
        {/* <Link href={`/dashboard/professor/sessions`}>Sessions</Link> */}
      </div>
      <div>
        {/* <Link href={`/dashboard/professor/assignments/${item.teaching_id}`}>Assignments</Link> */}
      </div>
    </div>
  ));
  return (
    <div className='w-full'>
      <div className='bg-gray-200 rounded-md p-2 grid grid-cols-3'>
        <div>Semester</div>
        <div>Course</div>
        <div>Professor</div>
        {/* <div>Sessions</div> */}
        {/* <div>Assignments</div> */}
      </div>
      {teachingItems}
    </div>
  );
}
