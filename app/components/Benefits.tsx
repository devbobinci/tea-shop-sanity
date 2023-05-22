import Image from "next/image";

import { benefitsList } from "@/lib/staticData";

export default function Benefits() {
  return (
    <div className="mb-6 my-8 xl:my-20 px-4 md:px-6 xl:px-0 max-w-7xl mx-auto">
      <h2 className="max-w-2xl mx-auto text-center text-3xl md:text-5xl font-playFair font-semibold text-black py-4 md:py-8">
        Tea, The pleasure of taking care of yourself
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8 xl:gap-8">
        {benefitsList.map((benefit) => (
          <div
            key={benefit.id}
            className="flex flex-col justify-center items-center group"
          >
            <Image
              src={benefit.icon}
              width={40}
              height={40}
              alt={`${benefit.name} icon`}
              className="object-cover h-12 w-12 group-hover:scale-110 transition-all"
            />

            <h4 className="font-bold text-lg py-3">{benefit.name}</h4>
            <p className="text-my-gray text-center max-w-md">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
