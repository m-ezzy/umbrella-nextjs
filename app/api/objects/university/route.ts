import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const session: any = await auth()

  // move this logic to middleware
  if(!session) {
    return new Response("Protected", {
      status: 401,
      statusText: "Unauthenticated",
      headers: {
        "Content-Type": "text/json"
      }
    })
  }
  
  const res = await prisma.university.findMany({
    where: {
      user_id: session.user.id,
    },
  })
  .then((data) => ({ data }) )
  .catch((error) => ({ error }) )

  return NextResponse.json(res);
}
export async function POST(request: Request) {
}
export async function PUT(request: Request) {
}
export async function DELETE(request: Request) {
}
