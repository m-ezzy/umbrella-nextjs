import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

export default async function ProfessorDashboard() {
  const session = await auth()
  return (
    <div className="p-2">
      <h1>Professor Dashboard</h1>
      <p>The beautiful profession of professing!</p>
    </div>
  )
}
