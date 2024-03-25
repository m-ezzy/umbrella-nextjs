import Image from "next/image";
import { VT323, Pixelify_Sans, Silkscreen } from 'next/font/google';

const font = Silkscreen({
  weight: '400',
  // subsets: ['latin'],
  subsets: ['latin'],
})

export default function MinecraftPage() {
  return (
    <div className={`h-full p-2 flex flex-col gap-2 items-center ${font.className} overflow-auto`}>
      <h1>The Home of Minecraft under the Umbrella!</h1>
      <p className="text-xl">Here everyone - creeper, skeleton, enderman are invited!</p>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <Image src="/assets/images/minecraft/Designer.jpeg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/images/minecraft/Designer (1).jpeg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/images/minecraft/Designer (2).jpeg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/images/minecraft/Designer (3).jpeg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/images/minecraft/Designer (4).jpeg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/images/minecraft/Designer (5).jpeg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/images/minecraft/Designer (6).jpeg" alt="m" width={340} height={340}></Image>
      </div>
    </div>
  );
}
