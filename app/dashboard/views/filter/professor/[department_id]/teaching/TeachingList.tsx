import Link from 'next/link';
// import TableHeader from '@/components/UI/TableHeader';

export default async function TeachingList({ teaching }: any) {
  const teachingItems = teaching.map((item: any) => (
    <div key={item.teaching_id} className='border-b p-2 grid grid-cols-7'>
      <div>{item.division.batch.syllabus.degree.degree_name_acronym}</div>
      <div>{item.division.batch.year_started}</div>
      <div>{item.division.division_name}</div>
      <div>{item.course.syllabus_course[0].course_semester}</div>
      <div>{item.course.course_name}</div>
      <div>
        <Link href={`/dashboard/professor/sessions`}>Sessions</Link>
      </div>
      <div>
        <Link href={`/dashboard/professor/assignments/${item.teaching_id}`}>Assignments</Link>
      </div>
    </div>
  ));

  // const titles = ['Batch', 'Division', 'Semester', 'Course', 'Sessions', 'Assignments'];

  return (
    <div className='w-full'>
      <div className='bg-gray-200 rounded-md p-2 grid grid-cols-7'>
        <div>Degree</div>
        <div>Batch</div>
        <div>Division</div>
        <div>Semester</div>
        <div>Course</div>
        <div>Sessions</div>
        <div>Assignments</div>
      </div>
      {teachingItems}
    </div>
  );
}
