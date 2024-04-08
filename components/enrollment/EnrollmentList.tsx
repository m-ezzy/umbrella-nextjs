// "use client";
import Link from "next/link";
// import { useState } from "react";

export default function EnrollmentList({ enrollments }: any) {
  console.log(enrollments[1].enrollment_number);

  const enrollmentItems = enrollments.map((enrollment: any) => (
    <li key={enrollment.enrollment_id} className="border-b p-2 grid grid-cols-6">
      <p>{enrollment.division.batch.year_started}</p>
      <p>{enrollment.division.division_name}</p>
      <p>{enrollment.enrollment_id}</p>
      <p>{String(enrollment.enrollment_number)}</p>
      <p>{enrollment.roll_number}</p>
      <p>{enrollment.user.name_first}</p>
    </li>
  ));
  return (
    <ul className="grid grid-cols-1 gap-2">
      <li className="bg-gray-200 rounded-md p-2 grid grid-cols-6">
        <p>Batch</p>
        <p>Division</p>
        <p>Enrollment ID</p>
        <p>Enrollment Number</p>
        <p>Roll Number</p>
        <p>Student Name</p>
      </li>
      {enrollmentItems}
    </ul>
  );
}
