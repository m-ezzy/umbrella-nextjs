import { assignment } from "@prisma/client"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import AssignmentList from "@/components/lists/AssignmentList"

export default async function Page() {
  let session = await auth()
  
  let assignments: assignment[] = await prisma.assignment.findMany({
    where: {
      teaching: {
        OR: [
          {
            professor_id: session?.user.id,
          },
          {
            batch: {
              enrollments: {
                some: {
                  user_id: session?.user.id,
                },
              },
            },
            division: {
              enrollments: {
                some: {
                  user_id: session?.user.id,
                },
              },
            },
          },
        ],
      },
    },
  })
  return (
    <>
      <AssignmentList assignments={assignments} />
    </>
  )
}
