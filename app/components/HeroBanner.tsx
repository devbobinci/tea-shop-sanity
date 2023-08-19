"use client";

import Image from "next/image";
import urlFor from "@/lib/urlFor";

import { BsChevronRight } from "@react-icons/all-files/bs/BsChevronRight";
import { BiPlay } from "@react-icons/all-files/bi/BiPlay";
import { motion as m } from "framer-motion";
import { Product } from "@/typings";

type Props = {
  bannerImage: Product;
};

export default async function HeroBanner({ bannerImage }: Props) {
  return (
    <div className="mt-20 h-[80vh] max-h-[600px] w-full bg-gradient-to-tr from-[#e2ad78] to-[#f4ca92] pt-5">
      {/* outer div */}
      <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 md:flex-row md:items-center md:justify-between md:px-6 xl:px-0">
        {/* text div */}
        {bannerImage && (
          <>
            <m.div
              initial={{ x: -150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-sm text-white"
            >
              <h1 className="pb-3 text-center font-playFair text-5xl md:text-left md:text-6xl lg:text-7xl">
                Pora na herbatę
              </h1>
              <p className="py-4 text-center text-lg md:text-left lg:text-xl">
                Wysokiej jakości produkty, które poprawią działanie organizmu i
                humor
              </p>

              <div className="flex flex-col items-center justify-center gap-2 md:items-start md:justify-normal lg:flex-row">
                <button className="inline-flex w-fit items-center gap-2 rounded-md bg-black px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base">
                  Zobacz <BsChevronRight />
                </button>
              </div>
            </m.div>

            <m.div
              initial={{ x: 150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex h-full w-full justify-center bg-contain bg-bottom bg-no-repeat"
              style={{ backgroundImage: `url(/images/podstawka.png)` }}
            >
              <Image
                src={urlFor(bannerImage?.mainImage?.asset).url()!}
                width={600}
                height={800}
                alt="Tea"
                className="absolute bottom-[2vh] left-1/2 h-2/3 w-fit -translate-x-[45%] object-contain md:bottom-[2vh] md:h-1/2 lg:bottom-[3vh] lg:h-2/3"
              />
            </m.div>
          </>
        )}
      </div>
    </div>
  );
}
