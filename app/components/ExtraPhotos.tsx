"use client";

import { useState } from "react";
import Image from "next/image";
import urlFor from "@/lib/urlFor";

type Props = {
  photos: MainImage[];
};

export default function ExtraPhotos({ photos }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="h-32 w-full flex gap-x-4">
        {photos?.map((item, i) => (
          <div key={item.asset._ref} className="bg-my-m-gray/20 rounded-md">
            <Image
              width={300}
              height={300}
              src={urlFor(item.asset).url()!}
              className={`${
                i === index ? "" : ""
              } h-full w-32 object-contain p-2`}
              onMouseEnter={() => setIndex(i)}
              alt="Product Image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
