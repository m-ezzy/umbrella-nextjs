import Charts from "./charts"
import { auth } from "@/auth"
import { prisma } from "@/lib/db"

export default async function Page({ params }: any) {
  const session: any = await auth()

  const session_attendance = await prisma.session.findMany({
    include: {
      attendances: {
        where: {
          user_id: parseInt(session.user.id),
        },
      }
    },
    where: {
      teaching: {
        course_id: parseInt(params.course_id),
        division: {
          enrollments: {
            some: {
              enrollment_id: parseInt(params.enrollment_id),
            },
          },
        },
      },
      // attendances: {
      //   some: {
      //     user_id: parseInt(session.user.id),
      //   },
      // },
    },
  });
  return (
    <div className="bg-white w-full h-full">
      <Charts session_attendance={session_attendance} />
    </div>
  );
}
