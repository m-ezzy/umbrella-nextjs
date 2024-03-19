import { getAttendance } from "@/models/student";

export default async function Page() {
  const data = await getAttendance();
  return (
    <div>
      <h1>Attendance</h1>
    </div>
  );
}
