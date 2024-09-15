import Link from "next/link";
import { session } from "@prisma/client";

export default function SessionList({ sessions }: { sessions: any[] }) {
  const items: any = sessions.map((session: any) => {
    return (
      <tr key={session.session_id} className="*:border-r *:p-2">
        <td><Link href={`courses/${session.course_id}`}>{session.course_name_acronym}</Link></td>
        <td>{session.name_first} {session.name_sur}</td>
        <td>{session.date.toLocaleDateString()}</td>
        <td>{session.start_time}</td>
        <td>{session.end_time}</td>
        <td>{session.floor_number}0{session.room_number}</td>
      </tr>
    );
  });
  return (
    <table className="border">
      <thead>
        <tr className="*:border-r *:p-2">
        </tr>
      </thead>
      <tbody className="border *:border">
        {items}
      </tbody>
    </table>
  );
}
