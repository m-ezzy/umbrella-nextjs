import { createDatabase, seedDatabase } from "@/lib/database"

export default async function Page() {
  const r1 = await createDatabase();
  const r2 = await seedDatabase();
  console.log(r1, r2);
  
  return (
    <div>
      <h1>Execute any code</h1>
      <p>Execute any code in your Next.js app</p>
    </div>
  )
}
