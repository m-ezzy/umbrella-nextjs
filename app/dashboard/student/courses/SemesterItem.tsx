"use client";
import { useState } from "react";
// import CourseList from './CourseList';

export default function SemesterItem({ children, semester_number, courses }: any) {
  const [show, setShow] = useState(false);

  function handleClickHeader(e: any) {
    // console.log(semester_number);
    setShow(!show);
  }

  // use <details> and <summary> instead of <h2> and <ul>
  // these are built-in HTML elements that do the same thing
  // you wouldn't need to use handleClickHeader and client component

  return (
    <li key={semester_number} className='border'>
      <h2 className='bg-white p-1' onClick={handleClickHeader}>Semester {semester_number}</h2>
      {/* <CourseList courses={courses} /> */}
      {/* {show && <ul>
        {courses.map((course: any) => <li key={course.id}>{course.name}</li>)}
      </ul>} */}
      {show && children}
    </li>
  );
}
