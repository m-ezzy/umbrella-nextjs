import Image from "next/image"

export default function Index() { //Home
  return (
    <div className="h-full">
    {/* <div className="grid grid-cols-2 h-full"> */}
      <h1 className="bg-violet-200 text-whit text-9xl h-screen text-center content-center">Umbrella</h1>
      {/* <h1 className="bg-white text-9xl flex text-center items-center">{data.university.name}</h1> */}
      {/* <div className="bg-white border-2 border-black size-20 rounded-full absolute place-self-center" /> */}
      
      <div className="relative h-screen flex justify-center">
        <Image src="https://webstockreview.net/images/clipart-rain-gif-transparent.gif" alt="Umbrella" width={100} height={100} className="absolute size-full" unoptimized />
        <h1 className="h-full content-center">Get under the Umbrella!</h1>
      </div>
    </div>
  )
}
