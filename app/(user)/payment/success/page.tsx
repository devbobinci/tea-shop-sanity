"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { runFireforks } from "@/app/utilities/confetti";
import { useShoppingCart } from "@/app/context/StateContext";

export default function Success() {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    runFireforks();
    clearCart();
  }, []);

  return (
    <>
      <div className="mx-auto my-20 max-w-7xl">
        <div className="absolute left-1/2 top-1/2 flex w-full max-w-sm -translate-x-[50%] -translate-y-[50%] flex-col items-center text-center">
          <p className="icon">
            <BsBagCheckFill size={120} className="text-emerald-500" />
          </p>
          <h2 className="py-8 text-2xl font-semibold">
            Dziękuję za złozenie zamówienia!
          </h2>
          <div className="pb-8 text-center">
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
          </div>
          <Link href="/">
            <button className="h-12 w-full rounded-xl bg-my-yellow px-6 py-3 text-center font-semibold text-white hover:text-black">
              Kontynuuj zakupy
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
