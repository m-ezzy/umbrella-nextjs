"use client"
import { use, useEffect, useState } from "react"
import { getDegrees, getLectures } from "@/models/professor"
import { createTeaching } from "@/actions/teaching"

export default function CreateTeaching({ division_courses, professors, teaching }: any) {
  // const [degrees, setDegrees] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [batchs, setBatchs] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [professorsFiltered, setProfessorsFiltered] = useState([]);

  // const [degree_id, setDegreeId] = useState(null);
  const [syllabus_id, setSyllabusId] = useState(null)
  const [batch_id, setBatchId] = useState(null)
  const [division_id, setDivisionId] = useState(null)
  const [semester, setSemester] = useState(null)
  const [course_id, setCourseId] = useState(null)
  const [professor_id, setProfessorId] = useState(null)

  let batchItems:any = [];
  let divisionItems:any = []
  let semesterItems:any = []
  let courseItems:any = []
  let professorItems:any = []

  // degreeItems = teaching.map(({ degree_id, degree_name }: any) => {
  //   return <option key={degree_id} value={degree_id}>{degree_name}</option>
  // });
  // syllabusItems = syllabus.map(({ syllabus_id, year_effective, year_retired }: any) => {
  //   return <option key={syllabus_id} value={syllabus_id}>From {year_effective} to {year_retired}</option>
  // });
  batchItems = batchs.map(({ batch_id, year_started }: any) => {
    return <option key={batch_id} value={batch_id}>{year_started}</option>
  });
  // divisionItems = divisions.map(({ division_id, division_name }: any) => {
  //   return <option key={division_id} value={division_id}>{division_name}</option>
  // });
  // courseItems = teaching.map(({ course_id, course_name }: any) => {
  //   return <option key={course_id} value={course_id}>{course_name}</option>
  // });
  // professorItems = teaching.map(({ professor_id, name_prefix, name_first, name_sur }: any) => {
  //   return <option key={professor_id} value={professor_id}>{name_prefix} {name_first} {name_sur}</option>
  // });

  console.log(division_courses)

  useEffect(() => {
    if(batch_id) {
      // const selectedDC = division_courses.filter((dc: any) => dc.batch_id == batch_id);
      const selectedDC = division_courses.find((dc: any) => dc.batch_id == batch_id);
      setBatchs(prev => selectedDC)
    } else {
      setBatchs(prev => division_courses)
    }
    // batchItems = selectedTeachings.map(({ batch_id, year_started }: any) => {
    //   return <option key={batch_id} value={batch_id}>{year_started}</option>
    // });
    // setDivisions(prev => selectedTeachings);
  }, [division_courses, batch_id]);

  // const handleChangeDegree = (e) => setDegreeId(prev => e.target.value);
  const handleChangeSyllabus = (e) => setSyllabus(prev => e.target.value);
  const handleChangeBatch = (e) => setBatchId(prev => e.target.value);
  const handleChangeDivision = (e) => setDivisionId(prev => e.target.value);
  const handleChangeSemester = (e) => setSemester(prev => e.target.value);
  const handleChangeCourse = (e) => setCourseId(prev => e.target.value);
  const handleChangeProfessor = (e) => setProfessorId(prev => e.target.value);

  return (
    <form action={createTeaching} className="form border rounded-md p-2 grid grid-cols-4 gap-2">
      {/* <select name="department_id" required>
        <option value="">Select Department</option>
      </select> */}
      {/* <select name="degree_id" required onChange={handleChangeDegree} >
        <option value="">Select Degree</option>
        {degreeItems}
      </select> */}
      {/* <select name="syllabus_id" required onChange={handleChangeSyllabus} >
        <option value="">Select Syllabus</option>
        {syllabusItems}
      </select> */}
      <select name="batch_id" required onChange={handleChangeBatch}>
        <option value="">Select Batch</option>
        {batchItems}
      </select>
      <select name="division_id" required onChange={handleChangeDivision}>
        <option value="">Select Division</option>
        {/* {divisionItems} */}
      </select>
      <select name="semester" required onChange={handleChangeSemester}>
        <option value="">Select Semester</option>
        {semesterItems}
      </select>
      <select name="course_id" required onChange={handleChangeCourse}>
        <option value="">Select Course</option>
        {courseItems}
      </select>
      <select name="professor_id" required onChange={handleChangeProfessor}>
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
