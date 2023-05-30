"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import { useShoppingCart } from "../context/StateContext";

import { motion as m } from "framer-motion";
import { DesktopNavLinks, MobileNavLinks } from "./NavLinks";

export default function Navbar() {
  const [menu, setMenu] = useState(false);

  const closeMenu = () => setMenu(false);
  const openMenu = () => setMenu(true);

  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <nav className="fixed left-0 top-0 z-[2] w-full bg-white shadow-md">
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
          <DesktopNavLinks />

          {/* On mobile only */}
          <MobileNavLinks closeMenu={closeMenu} menu={menu} />

          <div className="flex flex-row-reverse items-center gap-4 md:flex-row xl:gap-8">
            <button
              onClick={() => setMenu((prev) => !prev)}
              className="group relative h-full rounded-full bg-my-yellow p-2 text-xl text-white md:hidden"
            >
              {menu ? <IoMdClose /> : <HiOutlineMenuAlt2 />}
            </button>
            <Link
              href="/product"
              className="group hidden items-center gap-2 rounded-md bg-my-yellow px-4 py-2 text-sm hover:text-white md:inline-flex "
            >
              Get Started <BsChevronRight />
            </Link>
            <div onClick={openCart} className="relative cursor-pointer">
              <AiOutlineShoppingCart className="h-10 w-10 rounded-full border border-my-yellow bg-white p-2.5 text-my-yellow hover:bg-my-yellow hover:text-white" />
              {cartQuantity >= 1 && (
                <span className="absolute -bottom-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-my-red text-xs text-white">
                  {cartQuantity}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
