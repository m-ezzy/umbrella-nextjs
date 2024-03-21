import TimetableUltimate from '@/components/timetable/TimetableUltimate'
import { selectRoom } from '@/models/Room'
import { selectTeachingByDegree } from '@/models/Teaching'
import { selectByDegree } from '@/models/Timetable'

export default async function Page({ params }: {params: { degree_id: string }}) {
  const roomData = await selectRoom();
  const teachingData = await selectTeachingByDegree(params.degree_id);
  const timetableData = await selectByDegree(params.degree_id);

  return (
    <div className='w-full p-2 overflow-auto'>
      <TimetableUltimate timetableData={timetableData} teachingData={teachingData} roomData={roomData} />
    </div>
  );
}
