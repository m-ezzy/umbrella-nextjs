import { getAttendance } from "@/models/Student";

export default async function Page() {
  const data = await getAttendance();
  return (
    <div>
      <h1>Attendance</h1>
    </div>
  );
}
