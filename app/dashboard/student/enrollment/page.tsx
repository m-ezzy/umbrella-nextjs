import prisma from "@/lib/prisma"
import { auth } from '@/lib/auth'
import { enrollment } from '@prisma/client'
import { useStudentContext } from '@/contexts/StudentContext'
import ListTable from '@/components/ui/advanced/ListTable'

export default async function Page() {
  const session: any = await auth()

  const enrollments: any = await prisma.enrollment.findMany({
    include: {
      batch: {
        include: {
          syllabus: {
            include: {
              degree: {
                include: {
                  department: {
                    include: {
                      university: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    where: {
      user_id: session.user.id,
    },
  })

  // const menus: any = studentEnrollments.map((item: any) => ({
  //   key: item.enrollment_id,
  //   name: item.batch.syllabus.degree.degree_name_short,
  //   href: `/dashboard/views/tree/student/${item.enrollment_id}`,
  //   details: `Batch: ${item.batch.year_started}`,
  //   icon: "school",
  // }));

  // if(!enrollment) return (<div>Enrollment not found</div>);
  // if(enrollments.length == 0) throw new Error('Enrollment not found or you are not authorized to view this page.');

  const filtersDataset: any[] = enrollments.map((enrollment: any) => {
    return {
      University: enrollment.batch.syllabus.degree.department.university.name,
      Department: enrollment.batch.syllabus.degree.department.name,
      Degree: enrollment.batch.syllabus.degree.name,
      Syllabus: enrollment.batch.syllabus.year_effective,
      "Current Semester": enrollment.batch.current_semester,
    };
  });

  const filtersDatasetAll: any[] = enrollments.map((enrollment: any) => {
    return {
      id: enrollment.id,
      university_id: enrollment.batch.syllabus.degree.department.university.id,
      university_name: enrollment.batch.syllabus.degree.department.university.name,
      department_id: enrollment.batch.syllabus.degree.department.id,
      department_name: enrollment.batch.syllabus.degree.department.name,
      degree_id: enrollment.batch.syllabus.degree.id,
      degree: enrollment.batch.syllabus.degree.name,
      syllabus_id: enrollment.batch.syllabus.id,
      syllabus_year: enrollment.batch.syllabus.year_effective,
      current_semester: enrollment.batch.current_semester,
    };
  });

  const filtersData: any = [
    {
      label: "University",
      option_names_column: "university_name",
      option_values_column: "university_id",
    },
    {
      label: "Department",
      option_names_column: "department_name",
      option_values_column: "department_id",
    },
    {
      label: "Degree",
      option_names_column: "degree_name",
      option_values_column: "degree_id",
    },
    {
      label: "Syllabus",
      option_names_column: "syllabus_year",
      option_values_column: "syllabus_id",
    },
    {
      label: "Current Semester",
      option_names_column: "current_semester",
      option_values_column: "current_semester",
    },
  ];

  // const { setFiltersDataset, filters, setFilters }: any = useStudentContext();
  // setFiltersDataset((prev: any) => filtersDatasetAll);
  // setFilters((prev: any) => filters);

  return (
    <div className="p-4">
      <ListTable data={filtersDatasetAll} />
    </div>
  );
}
