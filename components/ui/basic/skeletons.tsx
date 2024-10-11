// Loading animation
const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

export function ObjectPageSkeleton() {
  return (
    <div className={`${shimmer} bg-gray-100 rounded-md p-4 space-y-4 animate-pulse`}>
      <div className="bg-gray-200 h-24 rounded-md"></div>
      <div className="bg-gray-200 h-80 rounded-md"></div>
    </div>
  )
}
export function TableSkeleton({ columns=5 }: { columns?: number }) {
  return (
    <table className={`${shimmer} bg-gray-200 min-w-full rounded-md block p-4 space-y-2 animate-pulse`}>
      <thead className="block">
        <tr className={`bg-white rounded-md p-2 grid grid-cols-${columns} gap-2`}>
          {Array.from({ length: columns }, (_, i) => (
            <th key={i} scope="col" className="bg-gray-200 rounded-md p-6" />
          ))}
        </tr>
      </thead>
      <tbody className="block rounded-md">
        {Array.from({ length: 5 }, (_, i) => (
          <tr key={i} className={`bg-white w-full p-2 space-x-2 grid grid-cols-${columns}`}>
            {Array.from({ length: columns }, (_, i) => (
              <td key={i} className={`bg-gray-300 h-10 rounded whitespace-nowrap px-3 py-3 ${i == 0 ? "w-10" : ""}`} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export function FilterListSkeleton({ count=5 }: { count?: number }) {
  return (
    <div className="bg-gray-200 p-2 gap-2 md:overflow-x-auto md:flex">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white rounded-md p-2 w-40 h-20 animate-pulse" />
      ))}
    </div>
  )
}
