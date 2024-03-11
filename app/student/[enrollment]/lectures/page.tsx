import { queryDatabase } from "@/lib/database";
import { getLectures } from "@/actions/student";

export default async function Page({ params }: any) {
  const data1:any = await queryDatabase(`SELECT division_id FROM batch_user WHERE enrollment_id=${params.enrollment}`)
  console.log(data1)
  const data:any = await getLectures(data1[0].division_id);

  const items: any = data.map((lecture:any) => {
    return (
      <div key={lecture.lecture_id}>
        Course: {lecture.course_name_acronym}
        Professor: {lecture.firstname}
        Date & Time: {lecture.date} {lecture.time}
        Room: {lecture.room_id}
      </div>
    );
  });
  return (
    <div>
      <h1>Lectures, Practicals,...</h1>
      {items}
    </div>
  );
}
