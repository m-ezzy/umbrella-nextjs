import { select } from '@/models/Teaching';
import { deleteTeaching } from '@/actions/teaching';

export default async function TeachingList({ teaching }) {
  const teachingItems = teaching.map((item: any) => (
    <div key={item.id} className='border-b grid grid-cols-5 p-5'>
      <div>{item.year_started}</div>
      <div>{item.division_name}</div>
      <div>{item.course_name}</div>
      <div>{item.name_prefix} {item.name_first} {item.name_sur}</div>
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
    <div className='mt-8'>
      <div className='border rounded-md grid grid-cols-5 p-1'>
        <span>Batch</span>
        <span>Division</span>
        <span>Course</span>
        <span>Professor</span>
        <span>Delete</span>
      </div>
      {teachingItems}
    </div>
  );
}
