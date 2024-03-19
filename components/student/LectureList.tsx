"use client";
import Link from "next/link";

type Lecture = {
  id: number;
  course_id: number;
  course_name_acronym: string;
  name_first: string;
  name_sur: string;
  date: string;
  start_time: string;
  end_time: string;
  floor_number: number;
  room_number: number;
}

export default function LectureList({ lectures }: { lectures: Lecture[] }) {
  const items: any = lectures.map((lecture:any) => {
    return (
      <tr key={lecture.id} className="*:border-r *:p-2">
        <td><Link href={`courses/${lecture.course_id}`}>{lecture.course_name_acronym}</Link></td>
        <td>{lecture.name_first} {lecture.name_sur}</td>
        <td>{new Date(lecture.date).toLocaleDateString()}</td>
        <td>{lecture.start_time}</td>
        <td>{lecture.end_time}</td>
        <td>{lecture.floor_number}0{lecture.room_number}</td>
      </tr>
    );
  });
  return (
    <table className="border">
      <thead>
        <tr className="*:border-r *:p-2">
          <th>Course</th>
          <th>Professor</th>
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
  );
}
