"use client";

import Image from "next/image";
import Link from "next/link";

import Marquee from "react-fast-marquee";

import { galleryList } from "@/lib/staticData";
import { useInView } from "react-intersection-observer";

export default function Footer() {
  const { ref: container, inView: containerVisible } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={container}
      className={`my-16 text-center transition-all duration-1000 xl:my-32 ${
        containerVisible ? "opacity-1 block" : "appearance-none opacity-0"
      }`}
    >
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
