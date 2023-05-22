"use client";

import Marquee from "react-fast-marquee";

export default function InfoBanner() {
  return (
    <div>
      <Marquee
        direction="right"
        autoFill
        pauseOnHover
        className="text-white text-xs bg-black p-2 uppercase"
      >
        <div className="flex items-center">
          <span className="bg-white rounded-full h-2 w-2 block mr-4" />
          <span className="mr-4">Free shipping on orders - $35 (US ONLY)</span>
          <span className="bg-white rounded-full h-2 w-2 block mr-4" />
          <span className="mr-4">Free shipping on orders - $35 (US ONLY)</span>
        </div>
      </Marquee>
    </div>
  );
}
