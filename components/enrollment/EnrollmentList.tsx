import Link from "next/link";

export default async function EnrollmentList({ enrollments }: any) {
  const enrollmentItems = enrollments.map((enrollment: any) => (
    <li key={enrollment.enrollment_id} className="border-b p-2 grid grid-cols-6">
      <p>{enrollment.enrollment_id}</p>
      <p>{enrollment.enrollment_number}</p>
      <p>{enrollment.roll_number}</p>
      <p>{enrollment.batch.year_started}</p>
      <p>{enrollment.division.division_name}</p>
      <p>{enrollment.user.name_first}</p>
    </li>
  ));
  return (
    <ul className="grid grid-cols-1 gap-2">
      <li className="bg-gray-200 border rounded-md p-2 grid grid-cols-6">
        <p>Enrollment ID</p>
        <p>Enrollment Number</p>
        <p>Roll Number</p>
        <p>Batch Year Started</p>
        <p>Division</p>
        <p>Student Name</p>
      </li>
      {enrollmentItems}
    </ul>
  );
}
