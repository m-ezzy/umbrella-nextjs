"use client";
import { use, useEffect, useState } from "react";
import { getDegrees, getLectures } from "@/models/Professor";
import { createLecture } from "@/actions/lecture";

export default function LectureCreate({ teaching }: any) {
  const [degrees, setDegrees] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [courses, setCourses] = useState([]);
  const [divisions, setDivisions] = useState([]);

  const [degree_id, setDegreeId] = useState(null);
  const [course_id, setCourseId] = useState(null);
  const [batch_id, setBatchId] = useState(null);
  const [division_id, setDivisionId] = useState(null);
  const [teaching_id, setTeachingId] = useState(null);

  // getDepartments().then((departments) => setDepartments(prev => departments));
  // getDegrees().then((degrees) => setDegrees(prev => degrees));
  // getSyllabus().then((syllabus) => setSyllabus(prev => syllabus));
  // getCourses().then((courses) => setCourses(prev => courses));

  const degreeItems = teaching.map(({ degree_id, degree_name }: any) => {
    return <option key={degree_id} value={degree_id}>{degree_name}</option>
  });
  const courseItems = teaching.map(({ course_id, course_name }: any) => {
    return <option key={course_id} value={course_id}>{course_name}</option>
  });
  const batchItems = teaching.map(({ batch_id, year_started }: any) => {
    return <option key={batch_id} value={batch_id}>{year_started}</option>
  });
  const divisionItems = divisions.map(({ division_id, division_name }: any) => {
    return <option key={division_id} value={division_id}>{division_name}</option>
  });

  const handleChangeDegree = (e) => {
    setDegreeId(prev => e.target.value);
  }
  const handleChangeCourse = (e) => {
    setCourseId(prev => e.target.value);
    // const course_id = e.target.value;
    // const selectedTeachings = teaching.filter((course: any) => course.course_id === course_id);
  }
  const handleChangeBatch = (e) => {
    setBatchId(prev => e.target.value);
    // const batch_id = e.target.value;
    // const selectedTeachings = teaching.filter((batch: any) => batch.batch_id === batch_id);
    // setBatchId(selectedTeachings[0].batch_id);
  }
  const handleChangeDivision = (e) => {
    setDivisionId(prev => e.target.value);
    // const division_id = e.target.value;
    // const selectedTeachings = teaching.filter((t: any) => t.division_id == division_id);
    // setTeachingId(selectedTeachings[0].teaching_id);
  }

  useEffect(() => {
    setDegrees(prev => teaching.filter((degree: any) => degree.degree_id == degree_id));
  }, [teaching, degree_id]);
  useEffect(() => {
    const selectedTeachings = teaching.filter((batch: any) => batch.batch_id == batch_id);
    setDivisions(prev => selectedTeachings);
  }, [teaching, batch_id]);
  useEffect(() => {
    const selectedTeachings = teaching.filter((t: any) => t.division_id == division_id && t.course_id == course_id);
    if(selectedTeachings.length) setTeachingId(prev => selectedTeachings[0].teaching_id);
  }, [teaching, course_id, division_id]);

  return (
    <form action={createLecture} className="form border p-2 grid grid-cols-4 gap-2">
      {/* <select name="department_id" required>
        <option value="">Select Department</option>
      </select> */}
      <select name="degree_id" required onChange={handleChangeDegree} >
        <option value="">Select Degree</option>
        {degreeItems}
      </select>
      {/* <select name="syllabus_id" required>
        <option value="">Select Syllabus</option>
      </select> */}
      <select name="course_id" required onChange={handleChangeCourse} >
        <option value="">Select Course</option>
        {courseItems}
      </select>
      <select name="batch_id" required onChange={handleChangeBatch} >
        <option value="">Select Batch</option>
        {batchItems}
      </select>
      <select name="division_id" required onChange={handleChangeDivision}>
        <option value="">Select Division</option>
        {divisionItems}
      </select>
      
      <input type="number" name="teaching_id" value={teaching_id} required hidden />

      <input type="date" name="date" required />
      <input type="time" name="start_time" required />
      <input type="time" name="end_time" required />
      <input type="number" name="room_id" placeholder="Room Number" required />
      <button type="submit" className="ms-aut">
        <span className="material-symbols-outlined">add</span>
        New Lecture
      </button>
    </form>
  );
}
