import Link from "next/link";
import { queryDatabase } from "@/lib/database";

export default async function Page({ params }: {params: { degree_id: number }}) {
  const batchs = await queryDatabase("SELECT * FROM batch WHERE degree_id = $1", [params.degree_id]);

  return (
    <div className="w-full p-2">
      <h1 className="text-2xl font-bold">Batchs</h1>
      <ul className="mt-2">
        {/* dispaly in card style. both batchs and division. show the number of studensts enrolled in batch and division and link to  show them on new page */}
      </ul>
    </div>
  );
}
