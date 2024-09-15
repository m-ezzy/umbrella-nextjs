import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, update } from "@/auth";
import { prisma } from "@/lib/db";
import Sidebar from "@/components/ui/Sidebar";
import MenuList from "@/components/ui/MenuList";
import StudentLayout from "@/layouts/StudentLayout";
import { Session } from "next-auth";

export default async function Layout({ children }: { children: any }) {
  const session: any = await auth();

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
  if(data.length == 0) {
    // redirect("/dashboard");
    return <div>You're not enrolled in any degree yet</div>
  }
  return (
    <StudentLayout data={data}>
      {children}
    </StudentLayout>
  );
}
