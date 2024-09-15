"use client";
import { createSyllabus } from "@/actions/syllabus";
import SyllabusList from "@/components/modules/syllabus/SyllabusList";
import ActionForm from "@/components/ui/ActionForm";
import ListTable from "@/components/ui/ListTable";
import { useAdminContext } from "@/contexts/AdminContext";
import { prisma } from "@/lib/db"

export default function Page() {
  const { filters, setFilters, selectedFilters }: any = useAdminContext();

  const fields: any = [
    { type: "number", name: "degree_id", hidden: true, defaultValue: selectedFilters.degree_id ? selectedFilters.degree_id[0] : "" },
    { type: "number", label: "Year Effective", name: "year_effective", required: true },
    { type: "text", label: "Code", name: "code", required: true },
    { type: "number", label: "Duration in semesters", name: "duration_semesters", required: true },
  ];

  return (
    <div className="w-full p-2 space-y-2">
      <ActionForm type="Create" fields={fields} serverAction={createSyllabus} label="Syllabus" />
      {/* <SyllabusList degree_ids={selectedFilters.degree_id} /> */}
      {/* <ListTable fields={["Year Effective", "Syllabus Code", "Duration in semesters"]} data={prisma.syllabus.findMany({ where: { degree_id: selectedFilters.degree_id } })} /> */}
    </div>
  );
}
