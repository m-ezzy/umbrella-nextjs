import Image from "next/image";
import { VT323, Pixelify_Sans, Silkscreen } from 'next/font/google';

const font = Silkscreen({
  weight: '400',
  subsets: ['latin'],
})

export default function MinecraftPage() {
  return (
    <div className={`h-full p-2 flex flex-col gap-2 items-center ${font.className}`}>
      <h1>The Home of Minecraft under the Umbrella!</h1>
      <p className="text-xl">Inviting all the creepers, skeletons, endermans & spiders!</p>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Image src="/assets/minecraft/dalle-image1.jpg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/minecraft/dalle-image2.jpg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/minecraft/dalle-image3.jpg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/minecraft/dalle-image4.jpg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/minecraft/dalle-image5.jpg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/minecraft/dalle-image6.jpg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/minecraft/dalle-image7.jpg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/minecraft/dalle-image8.jpg" alt="m" width={340} height={340}></Image>
        <Image src="/assets/minecraft/dalle-image9.jpg" alt="m" width={340} height={340}></Image>
      </div>
    </div>
  );
}
