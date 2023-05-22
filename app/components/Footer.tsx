import Image from "next/image";
import Link from "next/link";

import Marquee from "react-fast-marquee";

import { galleryList } from "@/lib/staticData";

export default function Footer() {
  return (
    <div className="my-16 xl:my-24 text-center">
      <Marquee direction="right" autoFill pauseOnHover className="mb-12">
        {galleryList.map((photo) => (
          <div key={photo.id} className="w-72 h-72">
            <Image
              src={photo?.img!}
              alt="tea drink"
              height={300}
              width={200}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </Marquee>

      <Link
        href="https://instagram.com/bvrtekk_"
        className="text-my-beige uppercase font-semibold text-lg underline"
      >
        Follow us on Instagram 📸
      </Link>
    </div>
  );
}
