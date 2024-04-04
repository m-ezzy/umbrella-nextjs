import Charts from "./charts";
import { prisma } from "@/lib/db";

export default async function Page({ params }: {params: { enrollment_id: string }}) {
  return (
    <div className="bg-white w-full h-full p-2">
      <Charts />
    </div>
  );
}
