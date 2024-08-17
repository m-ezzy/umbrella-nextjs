import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, update } from "@/auth";
import { prisma } from "@/lib/db";
import Sidebar from "@/components/ui/Sidebar";
import MenuList from "@/components/ui/MenuList";
import StudentFilters from "@/components/filters/StudentFilters";
import StudentLayout from "@/layouts/StudentLayout";

export default async function Layout({ children }: { children: any }) {
  const session: any = await auth();

  const enrollments: any[] = await prisma.enrollment.findMany({
    // select: {
    //   id: true,
    //   batch_id: true,
    //   batch: {
    //     select: {
    //       start_year: true,
    //       syllabus: {
    //         select: {
    //           degree: {
    //             select: {
    //               id: true,
    //               name: true,
    //               name_acronym: true,
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    where: {
      user_id: session.user.id,
    },
  });
  if(enrollments.length == 0) {
    redirect("/dashboard");
    // return (
    //   <div className="w-full h-full flex justify-center items-center">
    //     <div className="text-4xl text-gray-400">No enrollments found</div>
    //   </div>
    // );
  }
  // const menus: any = studentEnrollments.map((item: any) => ({
  //   key: item.enrollment_id,
  //   title: item.batch.syllabus.degree.degree_name_acronym,
  //   link: `/dashboard/views/tree/student/${item.enrollment_id}`,
  //   details: `Batch: ${item.batch.year_started}`,
  //   icon: "school",
  // }));
  const menus = [
    {
      key: "analysis",
      title: "Analysis",
      link: "/analysis",
      icon: "",
    },
    {
      key: "enrollments",
      title: "Enrollments",
      link: "/enrollments",
      icon: "",
    },
    {
      key: "courses",
      title: "Courses",
      link: "/courses",
      icon: "subject",
    },
    {
      key: "teaching",
      title: "Teaching",
      link: "/teaching",
      icon: "",
    },
    {
      key: "timetable",
      title: "Timetable",
      link: "/timetable",
      icon: "table",
    },
    {
      key: "sessions",
      title: "Sessions",
      link: "/sessions",
      icon: "",
    },
    {
      key: "attendance",
      title: "Attendance",
      link: "/attendance",
      icon: "",
    },
    {
      key: "assignments",
      title: "Assignments",
      link: "/assignments",
      icon: "assignment",
    },
    {
      key: "resourses",
      title: "Resourses",
      link: "/resourses",
      icon: "book",
    },
    {
      key: "grades",
      title: "Grades",
      link: "/grades",
      icon: "grade",
    },
    {
      key: "exams",
      title: "Exams",
      link: "/exams",
      icon: "assessment",
    },
    {
      key: "results",
      title: "Results",
      link: "/results",
      icon: "school",
    },
    {
      key: "activities",
      title: "Activities",
      link: "/activities",
      icon: "",
    },
    {
      key: "placements",
      title: "Placements",
      link: "/placements",
      icon: "",
    },
  ];
  const data: any = await prisma.enrollment.findMany({
    where: {
      user_id: session.user.id,
    },
    include: {
      division: true,
      batch: {
        include: {
          syllabus: {
            include: {
              courses: true,
              degree: {
                include: {
                  department: {
                    include: {
                      university: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return (
    <div className="bg-white w-full h-full flex">
      <div className="min-w-max overflow-y-auto">
        <MenuList menus={menus} pathSegment="/dashboard/student" pathPosition={3} />
      </div>
      <StudentLayout data={data} children={children} />
    </div>
  );
}
