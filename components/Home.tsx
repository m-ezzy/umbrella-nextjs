import data from "@/data/data.json";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-2 h-full relative">
      <h1 className="bg-violet-400 border-r-2 border-black text-9xl flex justify-center items-center">Umbrella</h1>
      <h1 className="bg-white text-9xl flex text-center items-center">{data.university.name}</h1>
      <Image src="/assets/images/college campus.gif" alt="campus" width={300} height={300} className="border-2 border-black absolute self-center place-self-center top-5" />
    </div>
  )
}
