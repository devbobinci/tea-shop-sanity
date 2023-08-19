"use client";

import Image from "next/image";

import { benefitsList } from "@/lib/staticData";
import { useInView } from "react-intersection-observer";

export default function Benefits() {
  const { ref: container, inView: containerVisible } = useInView({
    triggerOnce: true,
    delay: 1000,
  });
  return (
    <div
      ref={container}
      className={`mx-auto my-8 mb-6 max-w-7xl px-4 transition-all duration-1000 md:px-6 xl:my-20 xl:px-0 ${
        containerVisible ? "opacity-1 block" : "appearance-none opacity-0"
      }`}
    >
      <h2 className="mx-auto max-w-2xl py-4 text-center font-playFair text-3xl font-semibold text-black md:py-8 md:text-5xl">
        Herbata, przyjemność z dbania o siebie.
      </h2>

      <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-8">
        {benefitsList.map((benefit) => (
          <div
            key={benefit.id}
            className="group flex flex-col items-center justify-center"
          >
            <Image
              src={benefit.icon}
              width={40}
              height={40}
              alt={`${benefit.name} icon`}
              className="h-12 w-12 object-cover transition-all group-hover:scale-110"
            />

            <h4 className="py-3 text-lg font-bold">{benefit.name}</h4>
            <p className="max-w-md text-center text-sm text-my-gray">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
