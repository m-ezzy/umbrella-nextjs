import { selectAllByDepartment } from '@/models/Professor';
import { selectWithDivisionBatchSyllabus } from '@/models/Course';
import { selectTeachingByDegree } from '@/models/Teaching';
import TeachingCreate from '@/components/teaching/TeachingCreate';
import TeachingList from '@/components/teaching/TeachingList';

export default async function Page({ params }: {params: { degree_id: string }}) {
  const division_courses = await selectWithDivisionBatchSyllabus(params.degree_id);

  const professors = await selectAllByDepartment(params.degree_id);

  const teaching = await selectTeachingByDegree(params.degree_id);

  return (
    <div className='w-full p-2 overflow-auto'>
      <TeachingCreate division_courses={division_courses} professorsAll={professors} teaching={teaching} />
      <TeachingList teaching={teaching} />
    </div>
  );
}
