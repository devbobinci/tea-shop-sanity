"use client";
import { useState } from "react";

type Props = {
  packageSize: [string];
};

export default function PackageSize({ packageSize }: Props) {
  const [active, setActive] = useState(0);
  const activeSize = packageSize.filter((size, i) => i === active);

  return (
    <div className="py-6 xl:py-10">
      <h4 className="pb-4 text-xl font-semibold">Ilość w opakowaniu</h4>
      <div className="flex gap-2 md:gap-4 xl:gap-6">
        {packageSize.map((size, i) => (
          <div
            onClick={() => setActive(i)}
            key={size}
            className={`${
              active === i ? "border-my-yellow text-my-yellow" : ""
            } w-fit cursor-pointer rounded-md border border-my-gray/30 bg-white px-2 py-1 text-xs font-semibold text-my-gray hover:border-my-d-gray hover:text-my-d-gray md:text-sm`}
          >
            {" "}
            {size} grams
          </div>
        ))}
      </div>
    </div>
  );
}
