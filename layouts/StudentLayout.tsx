"use client";
import { useState } from "react";
import StudentFilters from "@/components/filters/StudentFilters";

export default function StudentLayout({ data, children }: any) {
  const [university, setUniversity] = useState(null);
  const [department, setDepartment] = useState(null);
  const [degree, setDegree] = useState(null);
  const [syllabus, setSyllabus] = useState(null);
  const [batch, setBatch] = useState(null);
  const [division, setDivision] = useState(null);
  const [semester, setSemester] = useState(null);
  const [course, setCourse] = useState(null);
  const [professor, setProfessor] = useState(null);

  return (
    <div className="w-full h-full">
      <StudentFilters data={data} />
      {children}
    </div>
  );
}
