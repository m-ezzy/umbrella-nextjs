"use client";
import { use, useEffect, useMemo, useState } from "react";
import LectureToolbar from "./LectureToolbar";
import LectureList from "./LectureList";

export default function Lecture({ lectures }: { lectures:any }) {
  const [filterBy, setFilterBy] = useState(null);

  let uniqueCoursesArray:any = [];
  // useEffect(() => {
    // Using Set to store unique course_name_acronym values
    const uniqueCourses = new Set(lectures.map((lecture:any) => lecture.course_name_acronym));
    uniqueCoursesArray = Array.from(uniqueCourses);
    console.log(uniqueCoursesArray);
  // }, []);

  // Filter lectures based on course
  let filteredLectures:any = [];
  if(filterBy) {
    filteredLectures = lectures.filter((lecture:any) => lecture.course_name_acronym === filterBy);
  } else {
    filteredLectures = lectures;
  }

  return (
    <div className="p-2">
      <h1>Lectures, Practicals,...</h1>
      <LectureToolbar courses={uniqueCoursesArray} setFilterBy={setFilterBy} />
      <LectureList lectures={filteredLectures} />
    </div>
  );
}
