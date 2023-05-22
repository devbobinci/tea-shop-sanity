import Image from "next/image";
import { BsChevronRight } from "react-icons/bs";
import { BiPlay } from "react-icons/bi";

import { getBannerImage } from "@/lib/sanity-db";
import urlFor from "@/lib/urlFor";

export default async function HeroBanner() {
  const bannerImage = await getBannerImage();

  return (
    <div className="h-[80vh] max-h-[600px] w-full bg-gradient-to-tr from-[#e2ad78] to-[#f4ca92] pt-5">
      {/* outer div */}
      <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 md:flex-row md:items-center md:justify-between md:px-6 xl:px-0">
        {/* text div */}
        <div className="max-w-sm text-white">
          <h1 className="pb-3 text-center font-playFair text-5xl md:text-left md:text-6xl lg:text-7xl">
            It&apos;s time to feel better
          </h1>
          <p className="py-4 text-center text-lg md:text-left lg:text-xl">
            High quality products to improve your health and mood
          </p>

          <div className="flex flex-col items-center justify-center gap-2 md:items-start md:justify-normal lg:flex-row">
            <button className="inline-flex w-fit items-center gap-2 rounded-md bg-black px-5 py-3 text-sm md:px-6 md:py-4 md:text-base">
              Get Started <BsChevronRight />
            </button>
            <button className="group inline-flex items-center gap-2 rounded-md py-2 text-sm md:text-base lg:px-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm group-hover:bg-white/50">
                <BiPlay className="ml-1 text-3xl" />
              </span>{" "}
              Watch Recipes
            </button>
          </div>
        </div>

        {/* image (from sanity) div */}
        <div
          className="relative flex h-full w-full justify-center bg-contain bg-bottom bg-no-repeat"
          style={{ backgroundImage: `url(/images/podstawka.png)` }}
        >
          <Image
            src={urlFor(bannerImage[0]?.image?.asset).url()!}
            width={600}
            height={800}
            alt="Tea"
            className="absolute bottom-8 left-3 h-2/3 w-full object-contain md:bottom-12 md:left-6 md:h-1/3 lg:bottom-12 lg:h-2/3"
          />
        </div>
      </div>
    </div>
  );
}
