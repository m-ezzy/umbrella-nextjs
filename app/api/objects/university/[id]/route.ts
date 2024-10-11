import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { deleteUniversity } from "@/actions/university"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // const id: number = Number(params.id)
  // const session: any = await auth()

  // let res = await prisma.university.findUnique({
  //   where: {
  //     id: id,
  //     user_id: session.user.id,
  //   },
  // })
  // .then((data) => ({ data }) )
  // .catch((error) => ({ error }) )

  // return NextResponse.json(res)
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // const id: number = Number(params.id)
  // const session: any = await auth()

  // let response = await prisma.university.delete({
  //   where: {
  //     id: id,
  //     user_id: session.user.id,
  //   },
  // })
  // .then((data) => {
  //   return NextResponse.json({ data }, { status: 200 })
  // })
  // .catch((error) => {
  //   return NextResponse.json({ error }, { status: 500 })
  // })

  // return response
}
