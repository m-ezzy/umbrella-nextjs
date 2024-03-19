
export default function Home() {
  return (
    <div className="grid grid-cols-2 h-full">
      <h1 className="bg-violet-400 text-9xl flex justify-center items-center">Umbrella</h1>
      <h1 className="bg-white text-9xl flex text-center items-center">{process.env.UNIVERSITY_NAME}</h1>
    </div>
  )
}
