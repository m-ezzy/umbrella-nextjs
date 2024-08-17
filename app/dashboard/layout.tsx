import Link from "next/link"
import { auth, update } from "@/auth"
import { prisma } from "@/lib/db"
import BreadcrumbBar from "@/components/ui/BreadcrumbBar"
import MenuList from "@/components/ui/MenuList"

export default async function Layout({ children }: { children: any }) {
  const allMenus: any = [
    {
      key: "founder",
      title: "Founder",
      link: "/founder",
      icon: "person",
    },
    {
      key: "manager",
      title: "Manager",
      link: "/manager",
      icon: "person",
    },
    {
      key: "head",
      title: "Head",
      link: "/head",
      icon: "person",
    },
    {
      key: "admin",
      title: "Admin",
      link: "/admin",
      icon: "person",
    },
    {
      key: "professor",
      title: "Professor",
      link: "/professor",
      icon: "person",
    },
    {
      key: "student",
      title: "Student",
      link: "/student",
      icon: "person",
    },
    // Staff, Clerks, Librarian, Poen, Watchman
    // Applicant Student
    // Applicant Faculty
    // Founder, President, Chancellor, Director, Dean
  ];

  const session:any = await auth()

  // put all this roles in the session for authorization and access control in the future
  // Founder - owner or creator or top guy of university
  const founderUniversity: any[] = await prisma.university.findMany({
    where: {
      user_id: session.user.id,
    },
  })
  // Manager - director of the university
  const managerUniversity: any[] = await prisma.manager.findMany({
    select: {
      university: true,
    },
    where: {
      user_id: session.user.id,
    },
  })
  // Head - head of any department
  const headDepartments: any[] = await prisma.faculty.findMany({
    where: {
      user_id: session.user.id,
      designation: "head",
    },
  })
  // Admin - admin of any degree of any department
  const adminDegrees: any[] = await prisma.admin.findMany({
    select: {
      degree: {
        select: {
          id: true,
          name_acronym: true,
        },
      },
    },
    where: {
      user_id: session.user.id,
    },
  })
  // Professor - employeed in any department
  const professorEmployments: any[] = await prisma.faculty.findMany({
    select: {
      department_id: true,
      department: {
        select: {
          name: true,
          name_acronym: true
        },
      },
    },
    where: {
      user_id: session.user.id,
      designation: {
        in: ["assistant_professor", "associate_professor"],
      },
    },
  })
  // Student - enrollments in any degree of any department
  const studentEnrollments: any[] = await prisma.enrollment.findMany({
    select: {
      id: true,
      batch_id: true,
      batch: {
        select: {
          start_year: true,
          syllabus: {
            select: {
              degree: {
                select: {
                  id: true,
                  name: true,
                  name_acronym: true,
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
      user_id: session.user.id,
    },
  });

  const menus: any = []
  if(founderUniversity.length > 0) {
    menus.push(allMenus[0])
  }
  if(managerUniversity.length > 0) {
    menus.push(allMenus[1])
  }
  if(headDepartments.length > 0) {
    menus.push(allMenus[2])
  }
  if(adminDegrees.length > 0) {
    menus.push(allMenus[3])
  }
  if(professorEmployments.length > 0) {
    menus.push(allMenus[4])
  }
  if(studentEnrollments.length > 0) {
    menus.push(allMenus[5])
  }

  let showMenu = true
  if(menus.length === 0) {
    return <h1>You have no role in this university yet</h1>
  } else if(menus.length === 1) {
    showMenu = false
  }

  const breadcrumbs: any = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Stack",
      path: "/dashboard/views/stack",
    },
  ]

  const founderUniversityList = founderUniversity.map((item: any) => (
    <li key={item.id} className="border rounded-md p-2 min-w-44">
      <Link href={`/dashboard/founder`}>
        <p>University: {item.name}</p>
      </Link>
    </li>
  ));
  const managerUniversityList = managerUniversity.map((item: any) => (
    <li key={item.id} className="border rounded-md p-2 min-w-44">
      <Link href={`/dashboard/manager`}>
        <p>University: {item.university.name}</p>
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
  const professorEmploymentsList = professorEmployments.map((item: any) => (
    <li key={item.department.department_id} className="border rounded-md p-2 min-w-44">
      {/* <Link href={`/dashboard/professor`}> */}
      <Link href={`/dashboard/professor/${item.department_id}/`}>
        <p>Department: {item.department.department_name}</p>
      </Link>
    </li>
  ));
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

  return (
    <div className="bg-gray-200 h-full flex">
      {/* <BreadcrumbBar breadcrumbs={breadcrumbs} /> */}
      <MenuList menus={menus} selected={"write code for this"} pathSegment="/dashboard" pathPosition={2} />
      {children}
    </div>
  )
  return (
    <main className="p-2 space-y-2">
      <h1 className="mb-6 border-b">Dashboard Selector</h1>
      <h3 className="font-semibold border-b p-2">Student</h3>
      <ul className="flex gap-2">{ studentEnrollmentsList }</ul>
      <h3 className="font-semibold border-b p-2">Professor</h3>
      <ul className="flex gap-2">{ professorEmploymentsList }</ul>
      <h3 className="font-semibold border-b p-2">Admin</h3>
      <ul className="flex gap-2">{ adminDegreesList }</ul>
      <h3 className="font-semibold border-b p-2">Head</h3> {/* Head Director */}
      <h3 className="font-semibold border-b p-2">Director</h3> {/* Director Manager */}
    </main>
  );
}
