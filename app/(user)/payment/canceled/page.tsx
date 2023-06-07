"use client";
import Link from "next/link";
import { BiErrorAlt } from "@react-icons/all-files/bi/BiErrorAlt";

export default function Success() {
  return (
    <>
      <div className="mx-auto my-20 max-w-7xl">
        <div className="absolute left-1/2 top-1/2 flex w-full max-w-sm -translate-x-[50%] -translate-y-[50%] flex-col items-center text-center">
          <p className="icon">
            <BiErrorAlt size={120} className="text-my-red" />
          </p>
          <h2 className="py-8 text-2xl font-semibold">
            Spróbuj ponownie, składanie zamówienia nie powiodło się!
          </h2>
          <div className="pb-8 text-center">
            <p className="email-msg">
              Przepraszamy za utrudnienia, błąd wystąpił po naszej stronie.
            </p>
            <p className="description">
              Jeśli masz pytania, odezwij sie na{" "}
              <a
                className="font-semibold text-my-red hover:underline"
                href="mailto:bartoslaw5@gmail.com"
              >
                bartoslaw5@gmail.com
              </a>
            </p>
          </div>
          <Link href="/">
            <button className="h-12 w-full rounded-xl bg-my-red px-6 py-3 text-center font-semibold text-white hover:text-black">
              Kontynuuj zakupy
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
