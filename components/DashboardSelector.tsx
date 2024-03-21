// "use server"
import Link from "next/link";
import { auth, update } from "@/auth";
import { queryDatabase } from "@/lib/database";
import { getEnrollments } from "@/models/Student";
import { getEmployments } from "@/models/Professor";
import { select } from "@/models/Admin";

export default async function DashboardSelector() {
  "use server";

  const session:any = await auth();

  // for professor
  // const res3:any = await queryDatabase('SELECT * FROM department_user WHERE user_id=?', [session.user.id])

  // for student
  // let studentEnrollments: any[] = await queryDatabase('SELECT * FROM batch_user WHERE user_id=?', [session.user.id]);
  // let i = 0;
  // for(let item of studentEnrollments) {
  //   const res:any = await queryDatabase('SELECT degree.id as degree_id,degree.name AS degree_name,degree.name_acronym AS degree_name_acronym,batch.year_started FROM degree INNER JOIN syllabus ON degree.id=syllabus.degree_id INNER JOIN batch ON batch.syllabus_id=syllabus.id WHERE batch.id=?', [ item.batch_id ]);
  //   studentEnrollments[i] = { ...item, ...res[0]}
  //   i++;
  // }

  const studentEnrollments: any[] = await getEnrollments();
  // console.log(studentEnrollments);

  const studentEnrollmentsList = studentEnrollments.map((item: any) => (
    <li key={item.batch_id} className="border p-2 min-w-44">
      <Link href={`student/${item.enrollment_id}/`}>
        <p>Degree: {item.degree_name} ({item.degree_name_acronym})</p>
        <p>Batch: {item.year_started}</p>
        <p>Division: {item.division_name}</p>
      </Link>
    </li>
  ));

  // for professor
  const professorEmployeed: any[] = await getEmployments(session.user.id);
  // console.log(professorEmployeed);

  const professorEmployeedList = professorEmployeed.map((item: any) => (
    <li key={item.department_id} className="border p-2 min-w-44">
      <Link href={`/professor`}>
      {/* <Link href={`professor/${item.department_id}/`}> */}
        <p>Department: {item.department_name}</p>
      </Link>
    </li>
  ));
  
  const adminDegrees: any[] = await select(session.user.id);
  // console.log(adminDegrees);

  const adminDegreesList = adminDegrees.map((item: any) => (
    <li key={item.degree_id} className="border p-2 min-w-44">
      <Link href={`admin/${item.degree_id}/`}>
        <p>Degree: {item.degree_name}</p>
      </Link>
    </li>
  ));

  return (
    <main className="p-2 space-y-2">
      <h1 className="mb-6 border-b">Dashboard Selector</h1>

      <h3 className="font-semibold border-b p-2">Student</h3>
      <ul className="flex gap-2">{ studentEnrollmentsList }</ul>

      <h3 className="font-semibold border-b p-2">Professor</h3>
      <ul className="flex gap-2">{ professorEmployeedList }</ul>

      <h3 className="font-semibold border-b p-2">Admin</h3>
      <ul className="flex gap-2">{ adminDegreesList }</ul>

      <h3 className="font-semibold border-b p-2">Head</h3>

      <h3 className="font-semibold border-b p-2">Director</h3> {/* Director Manager */}

      {/* <h3 className="font-semibold border p-2">Staff - Clerks, Librarian, Poen, Watchman,...</h3> */}

      {/* <h3 className="font-semibold border p-2">Applicant Student</h3> */}

      {/* <h3 className="font-semibold border p-2">Applicant Faculty</h3> */}
    </main>
  );
}
