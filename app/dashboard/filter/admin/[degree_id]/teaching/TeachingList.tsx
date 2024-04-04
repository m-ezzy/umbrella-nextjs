import { deleteTeaching } from '@/actions/teaching';

export default async function TeachingList({ teaching }: any) {
  const teachingItems = teaching.map((item: any) => (
    <div key={item.teaching_id} className='border-b grid grid-cols-6 p-2'>
      <div>{item.division.batch.year_started}</div>
      <div>{item.division.division_name}</div>
      <div>{item.course.syllabus_course[0].course_semester}</div>
      <div>{item.course.course_name}</div>
      <div>{item.professor.name_prefix} {item.professor.name_first} {item.professor.name_sur}</div>
      <div>
        <form action={deleteTeaching} method="post">
          <input type="hidden" name="teaching_id" value={item.teaching_id} />
          <button type="submit" className="bg-red-400">
            <span className="material-symbols-outlined">delete</span>
            Delete
          </button>
        </form>
      </div>
    </div>
  ));

  return (
    <div className='mt-4 sticky top-0'>
      <div className='bg-gray-200 rounded-md p-2 grid grid-cols-6'>
        <span>Batch</span>
        <span>Division</span>
        <span>Semester</span>
        <span>Course</span>
        <span>Professor</span>
        <span>Delete</span>
      </div>
      {teachingItems}
    </div>
  );
}
