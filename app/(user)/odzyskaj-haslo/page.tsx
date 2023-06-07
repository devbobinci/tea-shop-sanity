"use client";

import { useState, useEffect } from "react";

import { auth } from "@/app/utilities/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { toast } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const [email, setEmail] = useState<string>("");

  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  function handleChangePassword(
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) {
    e.preventDefault();

    if (!email || !email.includes("@") || email.length < 5) return;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Sprawdź skrzynkę pocztową");
      })
      .catch((error) => {
        const errorMessage = error.message;

        if (errorMessage.includes("user-not-found")) {
          return toast.error("Taki uzytkownik nie istnieje");
        }
      });
  }

  return (
    <div className="mx-auto my-24 max-w-7xl px-6 md:px-8 lg:my-32 xl:px-0">
      <div className="mx-auto max-w-3xl rounded-md bg-white p-6 text-center shadow-md xl:p-10">
        <h2 className="text-xl font-semibold md:text-2xl">
          Nie pamiętasz hasła?
        </h2>
        <p className="py-4 text-sm md:text-base">
          Podaj adres e-mail użyty podczas zakładania konta, a prześlemy Ci
          łącze umożliwiające zresetowanie hasła.
        </p>
        <form onSubmit={handleChangePassword} className="text-left">
          <label htmlFor="email" className="text-gray-700">
            E-mail
          </label>
          <br />
          <div className="w-full transition-all duration-500">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="w-full rounded-sm border py-2 pl-2 pr-4 outline-1 outline-my-yellow"
            />
          </div>
          <br />
          <button
            disabled={email.length < 5}
            className="rounded-sm border border-black/80 bg-black/80 px-5 py-2.5 text-sm text-white transition-all hover:bg-white hover:text-black/80 md:text-base"
            type="submit"
          >
            Prześlij
          </button>
        </form>
      </div>
    </div>
  );
}
