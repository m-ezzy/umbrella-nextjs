import { lecture, lecture_attendance } from "@prisma/client";

export default async function List({ attendances }: any) {
  const items = attendances.map((item: any) => (
    <li key={item.lecture_id} className="border-b p-2 grid grid-cols-7">
      <div>{item.lecture.teaching.course.syllabus_course.course_semester}</div>
      <div>{item.lecture.teaching.course.course_name}</div>
      <div>{item.lecture.teaching.professor.name_first}</div>
      <div>{item.lecture.lecture_date}</div>
      <div>{item.lecture.lecture_time_start}</div>
      <div>{item.lecture.lecture_time_end}</div>
      <div>{item.lecture.room.number}</div>
    </li>
  ));
  return (
    <div className="overflow-auto relative">
      <div className="bg-gray-200 rounded p-2 grid grid-cols-7 sticky top-0">
        <div>Semester</div>
        <div>Course</div>
        <div>Professor</div>
        <div>Date</div>
        <div>Start Time</div>
        <div>End Time</div>
        <div>Venue</div>
        <div>Attendance</div>
      </div>
      <ul className="flex-col gap-2">
        {items}
      </ul>
    </div>
  )
}
