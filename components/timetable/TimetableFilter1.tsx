"use client";
import { useEffect, useState } from "react";

export default function TimetableFilter1({ teachingData, batch_id, division_id, semester, setBatchId, setDivisionId, setSemester }: any) {
  let uniqueBatch = Array.from(new Set(teachingData.map((item) => item.batch_id)));
  let uniqueDivision = Array.from(new Set(teachingData.map((item) => item.division_id)));
  let uniqueSemester = Array.from(new Set(teachingData.map((item) => item.semester)));

  let batchItems:any = [];
  let divisionItems:any = [];
  let semesterItems:any = [];

  const handleChangeBatch = (e) => setBatchId(prev => e.target.value);
  const handleChangeDivision = (e) => setDivisionId(prev => e.target.value);
  const handleChangeSemester = (e) => setSemester(prev => e.target.value);

  if(division_id && semester) {
    // show timetable now only
    timetableDataFiltered = timetableData.filter((item) => {
      return item.division_id == division_id && item.semester == semester;
    });
  }

  batchItems = uniqueBatch.map((item) => {
    let selected: boolean = item == batch_id ? true : false;
    return <option key={item} value={item} selected={selected}>{item}</option>;
  });
  divisionItems = uniqueDivision.map((item) => {
    let selected: boolean = item == division_id ? true : false;
    return <option key={item} value={item} selected={selected}>{item}</option>;
  });
  semesterItems = uniqueSemester.map((item) => {
    let selected: boolean = item == semester ? true : false;
    return <option key={item} value={item} selected={selected}>{item}</option>;
  });

  return (
    <div className="border rounded-md p-2 grid grid-cols-8 gap-2 items-center">
      <label htmlFor="batch_id">Batch</label>
      <select name="batch_id" required onChange={handleChangeBatch}>
        {batchItems}
      </select>

      <label htmlFor="division_id">Division</label>
      <select name="division_id" required onChange={handleChangeDivision}>
        {divisionItems}
      </select>

      <label htmlFor="semester">Semester</label>
      <select name="semester" required onChange={handleChangeSemester}>
        <option value="">Select Semester</option>
        {semesterItems}
      </select>
    </div>
  );
}
