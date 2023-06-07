"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useShoppingCart } from "@/app/context/StateContext";

import { runFireforks } from "@/app/utilities/confetti";
import { motion as m } from "framer-motion";
import { BsFillBagFill } from "@react-icons/all-files/bs/BsFillBagFill";

export default function Success() {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    runFireforks();
    clearCart();
  }, []);

  return (
    <>
      <div className="mx-auto my-24 max-w-7xl px-4 md:px-6 xl:px-0">
        <div className="absolute left-1/2 top-1/2 flex w-full max-w-sm -translate-x-[50%] -translate-y-[50%] flex-col items-center text-center">
          <m.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, bounce: 10 }}
            className="icon"
          >
            <BsFillBagFill size={120} className="text-emerald-500" />
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, bounce: 10, delay: 0.15 }}
            className="py-8 text-2xl font-semibold"
          >
            Dziękujemy za złozenie zamówienia!
          </m.h2>
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, bounce: 10, delay: 0.3 }}
            className="pb-8 text-center"
          >
            <p className="email-msg">
              Sprawdź Swoją skrzynkę pocztową by zobaczyć podsumowanie.
            </p>
            <p className="description">
              Jeśli masz pytania, odezwij sie na{" "}
              <a
                className="font-semibold text-my-yellow hover:underline"
                href="mailto:bartoslaw5@gmail.com"
              >
                bartoslaw5@gmail.com
              </a>
            </p>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, bounce: 10, delay: 0.45 }}
          >
            <Link href={`/zamowienia`}>
              <button className="h-12 w-full rounded-xl bg-my-yellow px-6 py-3 text-center font-semibold text-white hover:text-black">
                Zobacz co zamówiłeś
              </button>
            </Link>
            <br />
            <br />
            <Link href="/">
              <button className="h-12 w-full text-center font-semibold text-my-yellow  hover:text-black">
                Kontynuuj zakupy
              </button>
            </Link>
          </m.div>
        </div>
      </div>
    </>
  );
}
