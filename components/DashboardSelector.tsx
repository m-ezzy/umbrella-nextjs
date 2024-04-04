import Link from "next/link";
import { auth, update } from "@/auth";
import { prisma } from "@/lib/db";

export default async function DashboardSelector() {
  const session:any = await auth();

  // Student - enrollments in any degree of any department
  const studentEnrollments: any[] = await prisma.enrollment.findMany({
    select: {
      enrollment_id: true,
      batch_id: true,
      batch: {
        select: {
          year_started: true,
          syllabus: {
            select: {
              degree: {
                select: {
                  degree_id: true,
                  degree_name: true,
                  degree_name_acronym: true,
                  // department: {
                  //   select: {
                  //     department_id: true,
                  //     department_name: true,
                  //     department_name_acronym: true,
                  //   },
                  // },
                },
              },
            },
          },
        },
      },
      // division: {
      //   select: {
      //     division_name: true
      //   },
      // },
    },
    where: {
      user_id: session.user.user_id,
    },
  });

  // Professor - employeed in any department
  const professorEmployments: any[] = await prisma.faculty.findMany({
    select: {
      department_id: true,
      department: {
        select: {
          department_name: true
        },
      },
    },
    where: {
      user_id: session.user.user_id,
    },
  });

  // Admin - admin of any degree of any department
  const adminDegrees: any[] = await prisma.admin.findMany({
    select: {
      admin_id: true,
      degree: {
        select: {
          degree_id: true,
          degree_name: true,
        },
      },
    },
    where: {
      user_id: session.user.user_id,
    },
  });

  const studentEnrollmentsList = studentEnrollments.map((item: any) => (
    <li key={item.batch_id} className="border rounded-md p-2 min-w-44">
      <Link href={`/dashboard/student/${item.enrollment_id}`}>
        {/* <p>Department: {item.batch.syllabus.degree.department.department_name} ({item.batch.syllabus.degree.department.department_name_acronym})</p> */}
        <p>Degree: {item.batch.syllabus.degree.degree_name} ({item.batch.syllabus.degree.degree_name_acronym})</p>
        <p>Batch: {item.batch.year_started}</p>
        {/* <p>Division: {item.division.division_name}</p> */}
      </Link>
    </li>
  ));

  const professorEmploymentsList = professorEmployments.map((item: any) => (
    <li key={item.department.department_id} className="border rounded-md p-2 min-w-44">
      {/* <Link href={`/dashboard/professor`}> */}
      <Link href={`/dashboard/professor/${item.department_id}/`}>
        <p>Department: {item.department.department_name}</p>
      </Link>
    </li>
  ));

  const adminDegreesList = adminDegrees.map((item: any) => (
    <li key={item.admin_id} className="border rounded-md p-2 min-w-44">
      <Link href={`/dashboard/admin/${item.degree.degree_id}`}>
        <p>Degree: {item.degree.degree_name}</p>
      </Link>
    </li>
  ));

  return (
    <main className="p-2 space-y-2">
      <h1 className="mb-6 border-b">Dashboard Selector</h1>

      <h3 className="font-semibold border-b p-2">Student</h3>
      <ul className="flex gap-2">{ studentEnrollmentsList }</ul>

      <h3 className="font-semibold border-b p-2">Professor</h3>
      <ul className="flex gap-2">{ professorEmploymentsList }</ul>

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
