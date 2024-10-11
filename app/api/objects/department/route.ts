import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session: any = await auth();
  const role: string = request.nextUrl.searchParams.get('role') as string;
  const university_id: number = request.nextUrl.searchParams.get('university_id') as unknown as number;

  let whereObject: Prisma.departmentWhereInput = {};
  
  if(role == "admin") {
    whereObject = {
      degrees: {
        some: {
          admins: {
            some: {
              user_id: session.user.id,
            },
          },
        },
      },
      university_id: Number(university_id),
    }
  }

  const result: any = await prisma.department.findMany({
    where: whereObject,
  })
  .then((data: any) => ({ data }) )
  .catch((error: any) => ({ error }) );
  return Response.json(result);
}
export async function POST(request: NextRequest) {
}
export async function PUT(request: NextRequest) {
}
export async function DELETE(request: NextRequest) {
}
