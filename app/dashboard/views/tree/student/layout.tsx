import Link from "next/link";
import { auth, update } from "@/auth";
import { prisma } from "@/lib/db";
import MenuList from "../_components/MenuList";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: any }) {
  const session: any = await auth();

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
                },
              },
            },
          },
        },
      },
    },
    where: {
      user_id: session.user.user_id,
    },
  });

  if(!studentEnrollments.length) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-4xl text-gray-400">No enrollments found</div>
      </div>
    );
  }
  
  const menus: any = studentEnrollments.map((item: any) => ({
    key: item.enrollment_id,
    title: item.batch.syllabus.degree.degree_name_acronym,
    link: `/dashboard/views/tree/student/${item.enrollment_id}`,
    details: `Batch: ${item.batch.year_started}`,
    icon: "school",
  }));

  return (
    <div className="bg-white w-full h-full flex">
      <MenuList menus={menus} pathPosition={4} />
      <div className="w-full h-full border-l">
        {children}
      </div>
    </div>
  );
}
