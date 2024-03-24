import { queryDatabase } from "@/lib/database";
import { getLectures } from "@/models/Student";
import Lecture from "@/components/student/Lecture";

export default async function Page({ params }: any) {
  const data1:any = await queryDatabase(`SELECT division_id FROM batch_user WHERE enrollment_id=${params.enrollment_id}`)
  const data:any = await getLectures(data1[0].division_id);

  return <Lecture lectures={data} />
}
