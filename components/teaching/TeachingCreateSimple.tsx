"use client"
import { use, useEffect, useState } from "react"
import { getDegrees, getLectures } from "@/models (to be deleted)/Professor"
import { createTeaching } from "@/actions/teaching"

export default function TeachingCreate({ division_courses, professors, teaching }: any) {
  const syllabusItems = division_courses.map(({ syllabus_id, year_effective, year_retired }: any) => {
    return <option key={syllabus_id} value={syllabus_id}>From {year_effective} to {year_retired}</option>
  });
  const batchItems = division_courses.map(({ batch_id, year_started }: any) => {
    return <option key={batch_id} value={batch_id}>{year_started}</option>
  });
  const divisionItems = division_courses.map(({ division_id, division_name }: any) => {
    return <option key={division_id} value={division_id}>{division_name}</option>
  });
  const semesterItems = division_courses.map(({ semester }: any) => {
    return <option key={semester} value={semester}>{semester}</option>
  });
  const courseItems = division_courses.map(({ course_id, course_name }: any) => {
    return <option key={course_id} value={course_id}>{course_name}</option>
  });
  const professorItems = professors.map(({ professor_id, name_prefix, name_first, name_sur }: any) => {
    return <option key={professor_id} value={professor_id}>{name_prefix} {name_first} {name_sur}</option>
  });

  return (
    <form action={createTeaching} className="form border rounded-md p-2 grid grid-cols-4 gap-2">
      {/* <select name="degree_id" required onChange={handleChangeDegree}>
        <option value="">Select Degree</option>
        {degreeItems}
      </select> */}
      <select name="syllabus_id" required>
        <option value="">Select Syllabus</option>
        {syllabusItems}
      </select>
      <select name="batch_id" required>
        <option value="">Select Batch</option>
        {batchItems}
      </select>
      <select name="division_id" required>
        <option value="">Select Division</option>
        {divisionItems}
      </select>
      <select name="semester" required>
        <option value="">Select Semester</option>
        {semesterItems}
      </select>
      <select name="course_id" required>
        <option value="">Select Course</option>
        {courseItems}
      </select>
      <select name="professor_id" required>
        <option value="">Select Professor</option>
        {professorItems}
      </select>

      <button type="submit" className="ms-aut">
        <span className="material-symbols-outlined">add</span>
        New Teaching
      </button>
    </form>
  );
}
