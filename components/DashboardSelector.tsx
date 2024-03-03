// "use server"
import Link from "next/link";
import { auth } from "@/auth";
import { queryDatabase } from "@/lib/database";

export default async function DashboardSelector() {
  const session:any = await auth();

  // for professor
  // const res3:any = await queryDatabase('SELECT * FROM department_user WHERE user_id=?', [session.user.id])

  // for student
  const res4:any = await queryDatabase('SELECT * FROM batch_user WHERE user_id=?', [session.user.id]);
  console.log(res4);
  const res6:any = await queryDatabase('SELECT degree.id as degree_id, degree.name_acronym FROM degree INNER JOIN syllabus ON degree.id=syllabus.degree_id INNER JOIN batch ON batch.syllabus_id=syllabus.id WHERE batch.id=?', [ res4[0].batch_id ]);
  console.log(res6);

  return (
    <main>
      <h1>Dashboard Selector</h1>
      <div className="border border-white">
        <div>Student</div>
        {
          res4.map((item: any) => (
            <div key={item.batch_id} className="border border-white">
              <Link href={`student/degree/`}>
                <p>degree: {res6[0].name_acronym}</p>
                <p>batch: {item.batch_id}</p>
                <p>division: {item.division_id}</p>
              </Link>
            </div>
          ))
        }
      </div>
    </main>
  );
}
