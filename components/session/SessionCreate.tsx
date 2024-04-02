"use client";
import { FormEvent, useEffect, useState } from "react";
import { createSession } from "@/actions/session";

export default function SessionCreate({ teaching, rooms }: any) {
  const [degrees, setDegrees] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [courses, setCourses] = useState([]);
  const [divisions, setDivisions] = useState([]);

  const [degree_id, setDegreeId] = useState(null);
  const [batch_id, setBatchId] = useState(null);
  const [division_id, setDivisionId] = useState(null);
  const [course_id, setCourseId] = useState(null);
  const [teaching_id, setTeachingId] = useState("");
  const [sessionType, setSessionType] = useState("lecture");
  const [roomId, setRoomId] = useState("");

  // getDepartments().then((departments) => setDepartments(prev => departments));
  // getDegrees().then((degrees) => setDegrees(prev => degrees));
  // getSyllabus().then((syllabus) => setSyllabus(prev => syllabus));
  // getCourses().then((courses) => setCourses(prev => courses));

  const degreeItems = teaching.map(({ degree_id, degree_name }: any) => {
    return <option key={degree_id} value={degree_id}>{degree_name}</option>
  });
  const batchItems = teaching.map(({ batch_id, year_started }: any) => {
    return <option key={batch_id} value={batch_id}>{year_started}</option>
  });
  const divisionItems = divisions.map(({ division_id, division_name }: any) => {
    return <option key={division_id} value={division_id}>{division_name}</option>
  });
  const courseItems = teaching.map(({ course_id, course_name }: any) => {
    return <option key={course_id} value={course_id}>{course_name}</option>
  });
  const roomItems = rooms.map(({ room_id, room_number }: any) => {
    return <option key={room_id} value={room_id}>{room_number}</option>
  });

  const handleChangeDegree = (e: any) => {
    setDegreeId(prev => e.target.value);
  }
  const handleChangeBatch = (e: any) => {
    setBatchId(prev => e.target.value);
    // const batch_id = e.target.value;
    // const selectedTeachings = teaching.filter((batch: any) => batch.batch_id === batch_id);
    // setBatchId(selectedTeachings[0].batch_id);
  }
  const handleChangeDivision = (e: any) => {
    setDivisionId(prev => e.target.value);
    // const division_id = e.target.value;
    // const selectedTeachings = teaching.filter((t: any) => t.division_id == division_id);
    // setTeachingId(selectedTeachings[0].teaching_id);
  }
  const handleChangeCourse = (e: any) => {
    setCourseId(prev => e.target.value);
    // const course_id = e.target.value;
    // const selectedTeachings = teaching.filter((course: any) => course.course_id === course_id);
  }
  const handleChangeSessionType = (e: any) => setSessionType(prev => e.target.value)

  // useEffect(() => {
  //   setDegrees(prev => teaching.filter((degree: any) => degree.degree_id == degree_id));
  // }, [teaching, degree_id]);
  // useEffect(() => {
  //   const selectedTeachings = teaching.filter((batch: any) => batch.batch_id == batch_id);
  //   setDivisions(prev => selectedTeachings);
  // }, [teaching, batch_id]);
  // useEffect(() => {
  //   const selectedTeachings = teaching.filter((t: any) => t.division_id == division_id && t.course_id == course_id);
  //   if(selectedTeachings.length) setTeachingId(prev => selectedTeachings[0].teaching_id);
  // }, [teaching, course_id, division_id]);

  return (
    <form action={createSession} className="bg-gray-200 form rounded-md p-2 grid grid-cols-8 gap-2 items-center">
      {/* <select name="department_id" required>
        <option value="">Select Department</option>
      </select> */}

      <label htmlFor="degree_id">Degree</label>
      <select name="degree_id" required onChange={handleChangeDegree} >
        {/* <option value="">Select Degree</option> */}
        {degreeItems}
      </select>

      {/* <select name="syllabus_id" required>
        <option value="">Select Syllabus</option>
      </select> */}

      <label htmlFor="batch_id">Batch</label>
      <select name="batch_id" required onChange={handleChangeBatch} >
        {/* <option value="">Select Batch</option> */}
        {batchItems}
      </select>

      <label htmlFor="division_id">Division</label>
      <select name="division_id" required onChange={handleChangeDivision}>
        {/* <option value="">Select Division</option> */}
        {divisionItems}
      </select>

      <label htmlFor="course_id">Course</label>
      <select name="course_id" required onChange={handleChangeCourse} >
        {/* <option value="">Select Course</option> */}
        {courseItems}
      </select>
      
      <input type="number" name="teaching_id" value={teaching_id} required hidden />

      <label htmlFor="type">Type</label>
      <select name="type" value={sessionType} required onChange={handleChangeSessionType} >
        <option value="lecture">Lecture</option>
        <option value="lab">Lab</option>
        <option value="tutorial">Tutorial</option>
        <option value="practical">Practical</option>
        <option value="seminar">Seminar</option>
        <option value="workshop">Workshop</option>
        <option value="conference">Conference</option>
      </select>

      <label htmlFor="date">Date</label>
      <input type="date" name="date" required />

      <label htmlFor="time_start">Start Time</label>
      <input type="time" name="time_start" required />

      <label htmlFor="time_end">End Time</label>
      <input type="time" name="time_end" required />

      <label htmlFor="room_id">Room Number</label>
      <select name="room_id" value={roomId} required>
        {roomItems}
      </select>

      <button type="submit" className="ms-aut">
        <span className="material-symbols-outlined">add</span>
        New Session
      </button>
    </form>
  );
}
