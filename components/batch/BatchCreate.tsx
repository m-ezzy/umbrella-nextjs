"use client";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createBatch } from "@/actions/batch";

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="col-span-2">
      <span className="material-symbols-outlined">add</span>
      New Batch
    </button>
  );
}

export default function BatchCreate({ syllabus, degree_id }: any) {
  const [formState, formAction] = useFormState(createBatch, null);
  
  const [syllabus_id, setSyllabusId] = useState("");
  const [batch_id, setBatchId] = useState(null);

  const syllabusItems = syllabus.map(({ syllabus_id, year_effective }: any) => {
    return <option key={syllabus_id} value={syllabus_id}>{year_effective}</option>
  });

  let semesters = 0;
  // useEffect(() => {
    if(syllabus_id) {
      semesters = syllabus.filter((s: any) => s.syllabus_id == syllabus_id)[0].duration_semesters;
    }
  // }, [syllabus_id]);

  const semesterItems: any = Array
    .from({ length: semesters }, (_, i) => i + 1)
    .map((semester: number) => {
      return <option key={semester} value={semester}>{semester}</option>
    });

  const handleChangeSyllabus = (e: any) => setSyllabusId(e.target.value);

  return (
    <form action={formAction} className="bg-gray-200 form rounded-md p-2 grid grid-cols-2 gap-2 items-center lg:grid-cols-10">
      <label htmlFor="syllabus_id">Syllabus from</label>
      <select name="syllabus_id" value={syllabus_id} required onChange={handleChangeSyllabus}>
        {/* <option value="">Select Syllabus</option> */}
        {syllabusItems}
      </select>

      <label htmlFor="year_started">Year Started</label>
      <input type="number" name="year_started" placeholder="Year Started" required />

      <label htmlFor="year_ended">Year Ended</label>
      <input type="number" name="year_ended" placeholder="Year Ended" />

      <label htmlFor="current_semester">Current Semester</label>
      {/* <input type="number" name="current_semester" placeholder="Current Semester" required /> */}
      <select name="current_semester" required>
        {/* <option value="">Select Semester</option> */}
        {semesterItems}
      </select>

      <SubmitButton />
    </form>
  );
}
