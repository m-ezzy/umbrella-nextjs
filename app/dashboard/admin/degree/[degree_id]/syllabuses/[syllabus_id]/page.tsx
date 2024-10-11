import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import ListTable from "@/components/ui/advanced/ListTable";
import CreateForm from "@/components/ui/advanced/CreateForm";

export default async function Page({ params }: { params: { degree_id?: string, syllabus_id: string } }) {
  const session: any = await auth();
  
  let syllabus = await prisma.syllabus.findUnique({
    where: {
      id: Number(params.syllabus_id),
      degree: {
        admins: {
          some: {
            user_id: session.user.id,
          },
        },
      },
    },
  });

  // if(!syllabus) redirect(`/dashboard/admin/${params.degree_id}/syllabus`);
  if(!syllabus) redirect(`/dashboard/admin/syllabus`);

  let courses = await prisma.course.findMany({
    where: {
      syllabus_id: Number(params.syllabus_id),
    },
  });
  return (
    <div className="w-full h-full p-2 space-y-2">
      <h3 className="border-b mb-4">Create Course</h3>
      {/* <CreateForm fields={[]} /> */}
      <h3 className="border-b mb-4">Courses</h3>
      <ListTable data={courses} />
    </div>
  );
}
