"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { MainImage } from "@/typings";

type Props = {
  photos: MainImage[];
  setCurrentImage: Dispatch<SetStateAction<MainImage>>;
  currentImage: MainImage;
};

export default function ExtraPhotos({ photos, setCurrentImage }: Props) {
  return (
    <div>
      <div className="flex h-32 w-full gap-x-4">
        {photos?.map((item, i) => (
          <div
            key={item.asset._ref}
            className="cursor-pointer rounded-md bg-my-m-gray/20 transition-all hover:shadow-lg"
          >
            <Image
              width={300}
              height={300}
              src={urlFor(item.asset).url()!}
              className="h-full w-32 object-contain p-2 transition-all hover:-translate-y-1"
              onClick={() => setCurrentImage(item)}
              alt="Product Image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
