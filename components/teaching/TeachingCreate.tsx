"use client"
import { use, useEffect, useState } from "react"
import { getDegrees, getLectures } from "@/models/Professor"
import { createTeaching } from "@/actions/teaching"

export default function TeachingCreate({ division_courses, professorsAll, teaching }: any) {
  // console.log(division_courses);
  // console.log(teaching);

  // syllabus ---> batch, division, semester, course
  // batch ---> syllabus, division
  // division ---> syllabus, batch, professor
  // semester ---> course
  // course ---> semester, professor





  // const [departments, setDepartments] = useState([]);
  // const [degrees, setDegrees] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [batchs, setBatchs] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);

  // const [department_id, setDepartmentId] = useState(null);
  // const [degree_id, setDegreeId] = useState(null);
  const [syllabus_id, setSyllabusId] = useState("");
  const [batch_id, setBatchId] = useState("");
  const [division_id, setDivisionId] = useState("");
  const [semester, setSemester] = useState("");
  const [course_id, setCourseId] = useState("");
  const [professor_id, setProfessorId] = useState("");

  // let daprtmentIems:any = [];
  // let degreeItems:any = [];
  let syllabusItems:any = [];
  let batchItems:any = [];
  let divisionItems:any = [];
  let semesterItems:any = [];
  let courseItems:any = [];
  let professorItems:any = [];

  let dc = division_courses;
  let p = professorsAll;

  if(syllabus_id) {
    dc = dc.filter((dc:any) => dc.syllabus_id == syllabus_id);
  }
  if(batch_id) {
    dc = dc.filter((dc:any) => dc.batch_id == batch_id);
  }
  if(division_id) {
    dc = dc.filter((dc:any) => dc.division_id == division_id);
  }
  if(semester) {
    dc = dc.filter((dc:any) => {
      return dc.semester == semester;
    });
  }
  if(course_id) {
    dc = dc.filter((dc:any) => {
      return dc.course_id == course_id;
    });
  }
  if(division_id && course_id) {
    // p = professorsAll.filter((professor: any) => {
    //   return teaching.some((teaching: any) => {
    //     return teaching.division_id == division_id && teaching.course_id == course_id && teaching.professor_id != professor.user_id;
    //   });
    // });
    p = professorsAll.map((professor: any) => {
      if(teaching.some((teaching: any) => {
        return teaching.division_id == division_id && teaching.course_id == course_id && teaching.professor_id == professor.user_id;
      })) {
        return { ...professor, disabled: true };
      } else {
        return { ...professor, disabled: false };
      }
    })
  }

  // departmentItems = departments.map(({ department_id, department_name }: any) => {
  //   return <option key={department_id} value={department_id}>{department_name}</option>
  // });
  // degreeItems = degrees.map(({ degree_id, degree_name }: any) => {
  //   return <option key={degree_id} value={degree_id}>{degree_name}</option>
  // });
  let uniqueSyllabus = new Set(dc.map((item: any) => item.syllabus_id));
  syllabusItems = dc.map(({ syllabus_id, year_effective, year_retired }: any) => {
    if(uniqueSyllabus.has(syllabus_id)) {
      uniqueSyllabus.delete(syllabus_id);
      return <option key={syllabus_id} value={syllabus_id}>From {year_effective} to {year_retired}</option>
    }
  });
  let uniqueBatch = new Set(dc.map((item: any) => item.batch_id));
  batchItems = dc.map(({ batch_id, year_started }: any) => {
    if(uniqueBatch.has(batch_id)) {
      uniqueBatch.delete(batch_id);
      return <option key={batch_id} value={batch_id}>{year_started}</option>
    }
  });
  let uniqueDivision = new Set(dc.map((item: any) => item.division_id));
  divisionItems = dc.map(({ division_id, division_name }: any) => {
    if(uniqueDivision.has(division_id)) {
      uniqueDivision.delete(division_id);
      return <option key={division_id} value={division_id}>{division_name}</option>
    }
  });
  let uniqueSemester = new Set(dc.map((item: any) => item.semester));
  semesterItems = dc.map(({ semester }: any) => {
    if(uniqueSemester.has(semester)) {
      uniqueSemester.delete(semester);
      return <option key={semester} value={semester}>{semester}</option>
    }
  });
  let uniqueCourse = new Set(dc.map((item: any) => item.course_id));
  courseItems = dc.map(({ course_id, course_name }: any) => {
    if(uniqueCourse.has(course_id)) {
      uniqueCourse.delete(course_id);
      return <option key={course_id} value={course_id}>{course_name}</option>
    }
  });

  professorItems = p.map(({ user_id: professor_id, name_prefix, name_first, name_sur, disabled }: any) => {
    return <option key={professor_id} value={professor_id} disabled={disabled}>{name_prefix} {name_first} {name_sur}</option>
  });

  // const handleChangeDepartment = (e) => setDepartmentId(prev => e.target.value);
  // const handleChangeDegree = (e) => setDegreeId(prev => e.target.value);
  const handleChangeSyllabus = (e) => setSyllabusId(prev => e.target.value);
  const handleChangeBatch = (e) => setBatchId(prev => e.target.value);
  const handleChangeDivision = (e) => setDivisionId(prev => e.target.value);
  const handleChangeSemester = (e) => setSemester(prev => e.target.value);
  const handleChangeCourse = (e) => setCourseId(prev => e.target.value);
  const handleChangeProfessor = (e) => setProfessorId(prev => e.target.value);

  return (
    <form action={createTeaching} className="bg-white form border rounded-md p-2 grid grid-cols-4 gap-2 stick top-">
      {/* <select name="department_id" required>
        <option value="">Select Department</option>
      </select> */}
      {/* <select name="degree_id" required onChange={handleChangeDegree} >
        <option value="">Select Degree</option>
        {degreeItems}
      </select> */}
      <select name="syllabus_id" value={syllabus_id} required onChange={handleChangeSyllabus} >
        <option value="">Select Syllabus</option>
        {syllabusItems}
      </select>
      <select name="batch_id" value={batch_id} required onChange={handleChangeBatch}>
        <option value="">Select Batch</option>
        {batchItems}
      </select>
      <select name="division_id" value={division_id} required onChange={handleChangeDivision}>
        <option value="">Select Division</option>
        {divisionItems}
      </select>
      <select name="semester" value={semester} required onChange={handleChangeSemester}>
        <option value="">Select Semester</option>
        {semesterItems}
      </select>
      <select name="course_id" value={course_id} required onChange={handleChangeCourse}>
        <option value="">Select Course</option>
        {courseItems}
      </select>
      <select name="professor_id" value={professor_id} required onChange={handleChangeProfessor}>
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
