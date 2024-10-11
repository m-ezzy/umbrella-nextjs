import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session: any = await auth();
  // const { course_id, semester, syllabus_id, professor_id, degree_id, department_id, university_id }: any = await request.json();

  let whereObject: Prisma.courseWhereInput = {};
  // if(course_id) whereObject["id"] = course_id;
  // if(semester) whereObject["semester"] = semester;
  // if(syllabus_id) whereObject["syllabus_id"] = syllabus_id;
  // if(professor_id) {
  //   whereObject["teachings"] = {};
  //   whereObject["teachings"]["some"] = {};
  //   whereObject["teachings"]["some"]["professor_id"] = professor_id;
  // }
  // if(degree_id) {
  //   whereObject["syllabus"] = {};
  // }
  // if(department_id) whereObject["department_id"] = department_id;
  // if(university_id) whereObject["university_id"] = university_id;

  const result: any = await prisma.course.findMany({
    where: whereObject,
    // {
    //   syllabus: {
    //     degree: {
    //       department: {
    //         university: {
    //           id: Number(filterUniversity?.value),
    //         },
    //         id: Number(filterDepartment?.value),
    //       },
    //       id: Number(filterDegree?.value),
    //     },
    //     id: Number(filterSyllabus?.value),
    //   },
    //   id: Number(filterCourse?.value),
    // }
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
