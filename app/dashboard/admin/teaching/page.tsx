"use client"

import prisma from "@/lib/prisma"
import TeachingModal from '@/components/forms/TeachingForm'
import TeachingList from '@/components/lists/TeachingList'

export default async function Page({ params }: {params: { degree_id: string }}) {
  const division_courses = await prisma.division.findMany({
    select: {
      division_id: true,
      division_name: true,
      batch: {
        select: {
          batch_id: true,
          year_started: true,
          syllabus: {
            select: {
              degree_id: true,
              syllabus_course: {
                select: {
                  course_id: true,
                  course: {
                    select: {
                      course_name: true,
                    },
                  },
                },
              }
            },
          },
        },
      },
    },
    where: {
      batch: {
        syllabus: {
          degree_id: parseInt(params.degree_id),
        },
      },
    },
  });
  // console.log(division_courses);

  const professors = await prisma.faculty.findMany({
    select: {
      user: {
        select: {
          user_id: true,
          name_prefix: true,
          name_first: true,
          name_sur: true,
        },
      },
    },
    where: {
      department: {
        degree: {
          some: {
            degree_id: parseInt(params.degree_id),
          },
        },
      },
    },
  });

  let teaching = await prisma.teaching.findMany({
    // include:{
    //   course: true,
    //   division: true,
    //   professor: true,
    // },
    select: {
      teaching_id: true,
      course: {
        select: {
          course_id: true,
          course_name: true,
          syllabus_course: {
            select: {
              course_semester: true,
            },
          },
        },
      },
      division: {
        select: {
          division_id: true,
          division_name: true,
          batch: {
            select: {
              batch_id: true,
              year_started: true,
            },
          },
        },
      },
      professor: {
        select: {
          user_id: true,
          name_prefix: true,
          name_first: true,
          name_sur: true,
        },
      },
    },
    where: {
      division: {
        batch: {
          syllabus: {
            degree_id: parseInt(params.degree_id),
          },
        },
      },
    },
  });
  // console.log(teaching[0].course);

  return (
    <>
      <TeachingModal data={teaching} />
      <TeachingList role="admin" data={teaching} />
    </>
  )
}
