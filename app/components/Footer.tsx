import Image from "next/image";
import Link from "next/link";

import Marquee from "react-fast-marquee";

import { galleryList } from "@/lib/staticData";

export default function Footer() {
  return (
    <div className="my-16 text-center xl:my-32">
      <Marquee direction="right" autoFill className="mb-12">
        {galleryList.map((photo) => (
          <div key={photo.id} className="h-72 w-72">
            <Image
              src={photo?.img!}
              alt="tea drink"
              height={300}
              width={200}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </Marquee>

      <Link
        href="https://instagram.com/bvrtekk_"
        className="text-lg font-semibold uppercase text-my-beige underline"
      >
        Follow us on Instagram 📸
      </Link>
    </div>
  );
}
