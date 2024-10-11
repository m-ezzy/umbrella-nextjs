import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { admin } from "@prisma/client";

// export const runtime = "edge"
// export const revalidate = 60

export async function GET(request: NextRequest) {
  const session: any = await auth();

  // move this logic to middleware
  if(!session) {
    return new Response("Protected", { status: 401, statusText: "Unauthenticated", headers: { "Content-Type": "text/json" } });
  }

  // if the parameters are sent in body instead of query
  // const params: any = await request.json();
  // console.log("Params:", params);

  /* single degree id */
  let degree_id = Number(request.nextUrl.searchParams.get("degree_id"));

  if(!degree_id) {
    return new Response("degree id is required", { status: 400 });
  }

  const admin: admin | null = await prisma.admin.findUnique({
    where: {
      degree_id_user_id: {
        degree_id: degree_id,
        user_id: session.user.id,
      }
    },
  });

  if(admin == null) {
    return new Response("Unauthorized", { status: 403, statusText: "Forbidden" });
  }

  /* multiple degree ids */
  let degree_ids: number[] = request.nextUrl.searchParams.getAll("degree_id").map(Number);

  if(degree_ids.length == 0) {
    return new Response("degree ids are required", { status: 400 });
  }

  const admins: admin[] | null = await prisma.admin.findMany({
    where: {
      degree_id: {
        in: degree_ids,
      },
      user_id: session.user.id,
    },
  });

  if(admins.length != degree_ids.length) {
    return new Response("Unauthorized", { status: 403, statusText: "Forbidden" });
  }



  /* getting data after checking authentication, authorization and parameter validation */
  const result = await prisma.syllabus.findMany({
    include: {
      _count: {
        select: {
          courses: true,
          batches: true,
        },
      },
      // degree: true,
    },
    where: {
      degree_id: {
        in: degree_ids,
      }
      // id: Number(params.syllabus_id),
    },
    orderBy: {
      year_effective: "desc",
    }
  })
  .then((data) => data )
  .catch((error) => ({ error: error.message }) );
  
  return new NextResponse(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
}
