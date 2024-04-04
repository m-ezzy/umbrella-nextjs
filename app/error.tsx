"use client";
import Image from "next/image";

export default function Error({ error }: any) {
  return (
    <div className="bg-red-300 h-full p-2 text-center">
      <h1>Error</h1>
      <h4>{error.toString()}</h4>
      <Image src="/assets/images/black-umbrella-png-9.png" alt="error" width={200} height={200} className="mt-24 mx-auto rotate-[-135deg]" /> {/* style={{ transform: 'rotate(-135deg)' }} */}
    </div>
  );
}
