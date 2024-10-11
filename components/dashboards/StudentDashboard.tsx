import { Chart } from "chart.js"
import { Doughnut, Line, Scatter } from "react-chartjs-2"
import { AttendanceMetrics } from "@/components/charts/StudentCharts"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

// all the charts, analysis, and data visualization goes here. also notifications and updates are here
export default async function StudentDashboard() {
  const session: any = await auth()

  // all the attendances
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
                user_id: session.user.id,
              },
            },
          },
        },
      },
    },
  })
  // semester-wise attendance
  // course-wise attendance
  // per day attendance
  // professor-wise attendance

  return (
    <div className="p-2">
      <h1>Student Dashboard</h1>
      {/* PP = popularity points or performance points like in "The Circle" movie. your rank out of 100 among all the students */}
      <AttendanceMetrics session_attendance={session_attendance} />
    </div>
  )
}
