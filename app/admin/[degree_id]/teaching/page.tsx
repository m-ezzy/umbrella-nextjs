import CreateTeachingSimple from '@/components/teaching/CreateTeaching';
import { select } from '@/models/Teaching';
import { selectWithDivisionBatchSyllabus } from '@/models/Course';

export default async function Page({ params }: {params: { degree_id: string }}) {
  const division_courses = await selectWithDivisionBatchSyllabus(params.degree_id);

  const teaching = await select();
  const teachingItems = teaching.map((item: any) => (
    <tr key={item.id}>
      <td>{item.course_id}</td>
      <td>{item.professor_id}</td>
      <td>{item.division_id}</td>
      <td>{item.batch_id}</td>
    </tr>
  ));

  return (
    <div className='w-full p-2'>
      <CreateTeachingSimple division_courses={division_courses} teaching={teaching} />
      <div className='mt-4'>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Professor</th>
              <th>Division</th>
              <th>Batch</th>
            </tr>
          </thead>
          <tbody>
            {teachingItems}
          </tbody>
        </table>
      </div>
    </div>
  );
}
