"use client";

import Image from "next/image";
import { useState } from "react";

import { reviewList } from "@/lib/staticData";

export default function BrandReview() {
  const [active, setActive] = useState(1);
  const activeQuote = reviewList.find((review) => review.id === active);

  return (
    <div className="mt-12 md:mt-20 mx-auto max-w-7xl">
      <h3 className="font-semibold uppercase text-xl text-center py-6">
        Some wild Reviews
      </h3>
      <div className="flex flex-col items-center justify-center md:flex-row gap-6">
        {reviewList.map((review) => (
          <div
            key={review?.id}
            onClick={() => setActive(review?.id)}
            className={`py-4 px-3 bg-white rounded-lg max-h-24 w-40 shadow-md cursor-pointer ${
              active === review?.id
                ? "border border-my-beige"
                : "border border-transparent"
            } `}
          >
            <Image
              src={review?.image}
              height={100}
              width={200}
              className="object-contain h-20 w-full px-4"
              alt={review?.name}
            />
          </div>
        ))}
      </div>
      <div className="text-center mx-auto max-w-lg my-8 px-4 md:px-0">
        <h2 className="font-bold font-playFair text-3xl">
          {activeQuote?.quote}
        </h2>
        <h4 className="mt-2 text-xs uppercase font-bold">
          {activeQuote?.name}
        </h4>
      </div>
    </div>
  );
}
