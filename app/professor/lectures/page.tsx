import Link from "next/link";
import { auth } from "@/auth";
import { getDegrees, getTeaching, getLectures } from "@/models/professor";
import { createLecture } from "@/actions/lecture";
import Image from "next/image";
import CreateLecture from "@/components/lecture/CreateLecture"

type Lecture = {
  id: number;
  course_id: number;
  course_name_acronym: string;
  degree_id: number;
  division_id: number;
  date: string;
  start_time: string;
  end_time: string;
  floor_number: number;
  room_number: number;
}

export default async function Page() {
  const session:any = await auth();

  const teaching:any = await getTeaching(session.user.id).catch(error => console.error(error))

  const lectures:any = await getLectures(session.user.id).catch(error => console.error(error))

  const items: any = lectures.map((lecture:any) => {
    return (
      <tr key={lecture.lecture_id} className="*:border-r *:p-2">
        <td><Link href={`courses/${lecture.course_id}`}>{lecture.course_name_acronym}</Link></td>
        <td>{lecture.degree_id}</td>
        <td>{lecture.division_id}</td>
        <td>{new Date(lecture.date).toLocaleDateString()}</td>
        <td>{lecture.start_time}</td>
        <td>{lecture.end_time}</td>
        <td>{lecture.floor_number}0{lecture.room_number}</td>
      </tr>
    );
  });

  return (
    <div className="w-full *:rounded-md p-2 space-y-2">
      <CreateLecture teaching={teaching} />
      <table className="border">
        <thead>
          <tr className="*:border-r *:p-2">
            <th>Course</th>
            <th>Degree</th>
            <th>Division</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Room Number</th>
          </tr>
        </thead>
        <tbody className="border *:border">
          {items}
        </tbody>
      </table>
    </div>
  );
}
