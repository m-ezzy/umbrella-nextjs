import prisma from '@/lib/prisma'
import TimetableModal from '@/components/forms/TimetableForm'
import TimetableView from '@/components/modules/TimetableView'

export default async function Page({ params, searchParams }: { params: any, searchParams: any }) {
  const roomData = await prisma.room.findMany({
    include: {
      floor: {
        include: {
          building: true,
        },
      },
    },
  })
  const teachingData = await prisma.teaching.findMany({
    include: {
      course: true,
      division: {
        include: {
          batch: true,
        },
      },
      professor: true,
    },
    // where: {
    //   division: {
    //     batch: {
    //       syllabus: {
    //         degree_id: parseInt(params?.degree_id),
    //       },
    //     },
    //   },
    // }
  })
  const timetableData = await prisma.timetable.findMany({
    include: {
      teaching: {
        include: {
          course: true,
          division: {
            include: {
              batch: true,
            },
          },
          professor: true,
        },
      },
      room: {
        include: {
          floor: {
            include: {
              building: true,
            },
          }
        },
      }
    },
    // where: {
    //   teaching: {
    //     division: {
    //       batch: {
    //         syllabus: {
    //           degree_id: parseInt(params.degree_id),
    //         },
    //       },
    //     },
    //   },
    // },
  })
  return (
    <>
      <TimetableModal />
      <TimetableView data={timetableData} />
    </>
  )
}
