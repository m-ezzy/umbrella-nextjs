import Link from "next/link";

export default function Page() {
  const views = ["tree", "filter", "object", "slideover", "freeform", "stack", "waterfall", "voice"]
  return (
    <div className="text-6xl w-full p-6 flex flex-wrap justify-center gap-6">
      {views.map((view) => (
        <div key={view} className="bg-black text-white rounded-md p-2 hover:animate-pulse">
          <Link href={`/dashboard/views/${view}`}>
            {view}
          </Link>
        </div>
      ))}
    </div>
  );
}
