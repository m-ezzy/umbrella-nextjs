import Image from 'next/image';

export default function Page() {
  return (
    <div className="bg-gray-400 h-full p-2">
      <h1 className="flex justify-center">404 - Page Not Found</h1>
      <Image src="/assets/images/umbrella-transparent.png" alt="not-found" width={200} height={200} className="mt-24 mx-auto rotate-[-135deg]" />
    </div>
  );
}
