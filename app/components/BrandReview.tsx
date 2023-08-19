"use client";

import Image from "next/image";
import { useState } from "react";

import { reviewList } from "@/lib/staticData";

import { useInView } from "react-intersection-observer";

export default function BrandReview() {
  const { ref: container, inView: containerVisible } = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  const [active, setActive] = useState(1);
  const activeQuote = reviewList.find((review) => review.id === active);

  return (
    <div
      ref={container}
      className={`mx-auto mt-12 max-w-7xl transition-all duration-1000 md:mt-20 ${
        containerVisible ? "opacity-1 block" : "appearance-none opacity-0"
      }`}
    >
      <h3 className="py-6 text-center text-xl font-semibold uppercase">
        Recenzje ekspertów
      </h3>
      <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
        {reviewList.map((review) => (
          <div
            key={review?.id}
            onClick={() => setActive(review?.id)}
            className={`max-h-24 w-40 cursor-pointer rounded-lg bg-white px-3 py-2 shadow-md transition-all hover:shadow-xl ${
              active === review?.id
                ? "border border-my-beige"
                : "border border-transparent"
            } `}
          >
            <Image
              src={review?.image}
              height={100}
              width={200}
              className="h-20 w-full object-contain px-4"
              alt={review?.name}
            />
          </div>
        ))}
      </div>
      <div className="mx-auto my-8 max-w-lg px-4 text-center md:px-0">
        <h2 className="font-playFair text-3xl font-bold">
          {activeQuote?.quote}
        </h2>
        <h4 className="mt-2 text-xs font-bold uppercase">
          {activeQuote?.name}
        </h4>
      </div>
    </div>
  );
}
