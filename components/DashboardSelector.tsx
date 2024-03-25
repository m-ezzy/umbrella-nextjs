import Link from "next/link";
import { auth, update } from "@/auth";
import { selectByUserId as getEnrollments } from "@/models/Enrollment";
import { getEmployments } from "@/models/Professor";
import { selectByUserId } from "@/models/Admin";
import { prisma } from "@/lib/db";
// import { selectByUserIdWhereHead } from "@/models/Faculty";
// import { selectByUserId } from "@/models/Director";

export default async function DashboardSelector() {
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

  // const studentEnrollments: any[] = await getEnrollments(session.user.user_id);
  // console.log(studentEnrollments);
  const studentEnrollments: any[] = await prisma.enrollment.findMany({
    select: {
      enrollment_id: true,
      batch_id: true,
      batch: {
        select: {
          year_started: true,
          syllabus: {
            select: {
              degree: { select: { degree_id: true, degree_name: true, degree_name_acronym: true } }
            }
          }
        }
      },
      division: { select: { division_name: true } }
    },
    where: {
      user_id: session.user.user_id,
    },
  });
  // console.log(studentEnrollments[0]?.batch);

  const studentEnrollmentsList = studentEnrollments.map((item: any) => (
    <li key={item.batch_id} className="border p-2 min-w-44">
      <Link href={`/dashboard/student/${item.enrollment_id}/`}>
        <p>Degree: {item.batch.syllabus.degree.degree_name} ({item.batch.syllabus.degree.degree_name_acronym})</p>
        <p>Batch: {item.batch.year_started}</p>
        <p>Division: {item.division.division_name}</p>
      </Link>
    </li>
  ));

  // for professor
  const professorEmployeed: any[] = await getEmployments(session.user.user_id);
  console.log(professorEmployeed);

  const professorEmployeedList = professorEmployeed.map((item: any) => (
    <li key={item.department_id} className="border p-2 min-w-44">
      <Link href={`/dashboard/professor`}>
      {/* <Link href={`professor/${item.department_id}/`}> */}
        <p>Department: {item.department_name}</p>
      </Link>
    </li>
  ));
  
  const adminDegrees: any[] = await selectByUserId(session.user.user_id);
  console.log(adminDegrees);

  const adminDegreesList = adminDegrees.map((item: any) => (
    <li key={item.degree_id} className="border p-2 min-w-44">
      <Link href={`/dashboard/admin/${item.degree_id}/`}>
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
