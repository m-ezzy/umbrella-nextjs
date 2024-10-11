import Image from 'next/image';

export default function Page() {
  return (
    <div className="bg-gray-300 min-h-full">
      <h1 className="p-4 text-center">404 - Page Not Found</h1>
      <Image src="/assets/images/umbrella-transparent.png" alt="not-found" width={200} height={200} className="mt-24 mx-auto rotate-[-135deg]" />
    </div>
  );
}
