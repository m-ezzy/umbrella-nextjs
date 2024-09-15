"use client";
import { createContext, useContext, useState } from "react";

const StudentContext: any = createContext(null);

export function useStudentContext() {
  return useContext(StudentContext);
}

export function StudentContextProvider({ children, data }: any) {
  const [currentMenu, setCurrentMenu] = useState(null);
  const [filters, setFilters] = useState({});

  // const [university, setUniversity] = useState(null);
  // const [department, setDepartment] = useState(null);
  // const [degree, setDegree] = useState(null);
  // const [syllabus, setSyllabus] = useState(null);
  // const [batch, setBatch] = useState(null);
  // const [division, setDivision] = useState(null);
  // const [semester, setSemester] = useState([]);
  // const [course, setCourse] = useState(null);
  // const [professor, setProfessor] = useState(null);

  return (
    <StudentContext.Provider value={{
      currentMenu,
      setCurrentMenu,
      filters,
      setFilters,
      // university,
      // setUniversity,
      // department,
      // setDepartment,
      // degree,
      // setDegree,
      // syllabus,
      // setSyllabus,
      // batch,
      // setBatch,
      // division,
      // setDivision,
      // semester,
      // setSemester,
      // course,
      // setCourse,
      // professor,
      // setProfessor,
    }}>
      {children}
    </StudentContext.Provider>
  );
}
