import Charts from "./charts";
import { prisma } from "@/lib/db";

export default async function Page({ params }: {params: { enrollment_id: string }}) {
  const session_attendance = await prisma.session_attendance.findMany({
    select: {
      status: true,
    },
    where: {
      session: {
        teaching: {
          division: {
            enrollments: {
              some: {
                enrollment_id: parseInt(params.enrollment_id),
              }
            }
          }
        }
      }
    },
  });
  return (
    <div className="bg-white w-full h-full p-2">
      <Charts session_attendance={session_attendance} />
    </div>
  );
}
