"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import { useShoppingCart } from "../context/StateContext";

export default function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <nav className="fixed left-0 top-0 z-10 w-full bg-white shadow-md">
      <div className="mx-auto max-w-7xl ">
        <div className="mx-auto flex items-center justify-between bg-white px-4 py-4 md:px-6 lg:py-6 xl:px-0">
          <Link href="/">
            <Image
              src="/images/logo-color.png"
              height={100}
              width={100}
              alt="Tea logo"
              className="h-14 w-14"
            />
          </Link>
          {/* hidden on mobile */}
          <ul className="hidden space-x-6 md:flex">
            <li>Our shop</li>
            <li>
              <Link href="#products">Products</Link>
            </li>
            <li>Subscribe</li>
            <li>Learn</li>
            <li>Refer</li>
          </ul>

          <div className="flex items-center gap-4 xl:gap-8">
            <button className="group flex items-center gap-2 rounded-md bg-my-yellow px-4 py-2 text-sm">
              Get Started <BsChevronRight />
            </button>
            <div onClick={openCart} className="relative cursor-pointer">
              <AiOutlineShoppingCart className="h-10 w-10 rounded-full border border-my-yellow p-2.5 text-my-yellow hover:bg-my-yellow hover:text-white" />
              {cartQuantity >= 1 && (
                <div className="absolute -bottom-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-my-red text-xs text-white">
                  {cartQuantity}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
