"use client";

import Link from "next/link";
import { motion as m } from "framer-motion";
import { usePathname } from "next/navigation";

export function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <ul className="hidden space-x-6 md:flex">
      <li className="group relative font-semibold uppercase">
        <span className="absolute -bottom-2 left-1/2 inline-block h-[2px] w-0 -translate-x-[50%] rounded-md bg-my-yellow transition-all group-hover:w-full"></span>
        <Link href="/">Głowna</Link>
        {pathname === "/" && (
          <span className="absolute -bottom-2 left-1/2 inline-block h-[2px] w-full -translate-x-[50%] rounded-md bg-my-yellow transition-all"></span>
        )}
      </li>
      <li className="group relative font-semibold uppercase">
        <span className="absolute -bottom-2 left-1/2 inline-block h-[2px] w-0 -translate-x-[50%] rounded-md bg-my-yellow transition-all group-hover:w-full"></span>
        <Link href="/product">Produkty</Link>
        {pathname === "/product" && (
          <span className="absolute -bottom-2 left-1/2 inline-block h-[2px] w-full -translate-x-[50%] rounded-md bg-my-yellow transition-all"></span>
        )}
      </li>
      <li className="group relative font-semibold uppercase">
        <span className="absolute -bottom-2 left-1/2 inline-block h-[2px] w-0 -translate-x-[50%] rounded-md bg-my-yellow transition-all group-hover:w-full"></span>
        <Link href="/post">Posty</Link>
        {pathname === "/post" && (
          <span className="absolute -bottom-2 left-1/2 inline-block h-[2px] w-full -translate-x-[50%] rounded-md bg-my-yellow transition-all"></span>
        )}
      </li>
      <li className="group relative font-semibold uppercase">
        <span className="absolute -bottom-2 left-1/2 inline-block h-[2px] w-0 -translate-x-[50%] rounded-md bg-my-yellow transition-all group-hover:w-full"></span>
        <Link href="/przepis">Przepisy</Link>
        {pathname === "/przepis" && (
          <span className="absolute -bottom-2 left-1/2 inline-block h-[2px] w-full -translate-x-[50%] rounded-md bg-my-yellow transition-all"></span>
        )}
      </li>
    </ul>
  );
}

type Props = {
  menu: boolean;
  closeMenu: () => void;
};

export function MobileNavLinks({ closeMenu, menu }: Props) {
  return (
    <div
      className={`${
        menu &&
        "fixed bottom-0 left-0 flex h-full w-full items-end bg-black/30 backdrop-blur-sm transition-all md:right-0 md:top-0"
      } md:hidden`}
    >
      <ul
        className={`fixed right-0 top-0 z-10 h-full bg-white/50 transition-all duration-300 md:hidden ${
          menu ? "w-3/4" : "w-0"
        }`}
      >
        {menu && (
          <m.div
            className="flex h-full w-full flex-col items-center justify-center gap-8"
            transition={{ delay: 0.5 }}
          >
            <li
              onClick={closeMenu}
              className="group relative text-xl font-semibold"
            >
              <span className="absolute -bottom-2 inline-block h-[2px] w-0 rounded-md bg-my-yellow transition-all group-hover:w-full"></span>
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={closeMenu}
              className="group relative text-xl font-semibold"
            >
              <span className="absolute -bottom-2 inline-block h-[2px] w-0 rounded-md bg-my-yellow transition-all group-hover:w-full"></span>
              <Link href="/product">Produkty</Link>
            </li>
            <li
              onClick={closeMenu}
              className="group relative text-xl font-semibold"
            >
              <span className="absolute -bottom-2 inline-block h-[2px] w-0 rounded-md bg-my-yellow transition-all group-hover:w-full"></span>
              <Link href="/post">Posty</Link>
            </li>
            <li
              onClick={closeMenu}
              className="group relative text-xl font-semibold"
            >
              <span className="absolute -bottom-2 inline-block h-[2px] w-0 rounded-md bg-my-yellow transition-all group-hover:w-full"></span>
              <Link href="/przepis">Przepisy</Link>
            </li>
          </m.div>
        )}
      </ul>
    </div>
  );
}
