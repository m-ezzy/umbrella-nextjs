import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

export default async function FounderDashboard() {
  const session = await auth()
  return (
    <div className="p-2">
      <h1>Founder Dashboard</h1>
      <p>Create a university to get started!</p>
    </div>
  )
}
