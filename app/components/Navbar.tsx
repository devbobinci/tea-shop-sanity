"use client";

import { Auth, getAuth, signOut, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { AiOutlineLogout, AiOutlineShoppingCart } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { HiOutlineMenuAlt2, HiOutlineUser } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { TfiPackage } from "react-icons/tfi";

import { useShoppingCart } from "../context/StateContext";

import { motion as m } from "framer-motion";
import { DesktopNavLinks, MobileNavLinks } from "./NavLinks";
import UserPanel from "./UserPanel";
import toast from "react-hot-toast";

import {
  UserPanelContextProvider,
  useUserPanelContext,
} from "../context/UserPanelContext";

export default function Navbar() {
  const [menu, setMenu] = useState(false);

  const [loggedUserPanel, setLoggedUserPanel] = useState(false);

  const { userPanel, setUserPanel } = useUserPanelContext();

  const { openCart, cartQuantity } = useShoppingCart();

  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const closeMenu = () => setMenu(false);
  return (
    <>
      <nav
        className="fixed left-0 top-0 z-10 w-full bg-white shadow-md"
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-7xl">
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

            <div
              className="flex flex-row-reverse items-center gap-4 md:flex-row"
              suppressHydrationWarning
            >
              <button
                onClick={() => setMenu((prev) => !prev)}
                className="group relative h-full rounded-full bg-my-yellow p-2 text-xl text-white md:hidden"
              >
                {menu ? <IoMdClose /> : <HiOutlineMenuAlt2 />}
              </button>

              <div onClick={openCart} className="relative cursor-pointer">
                <AiOutlineShoppingCart className="h-10 w-10 rounded-full border border-my-yellow bg-white p-2.5 text-my-yellow hover:bg-my-yellow hover:text-white" />
                {cartQuantity >= 1 && (
                  <span className="absolute -bottom-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-my-red text-xs text-white">
                    {cartQuantity}
                  </span>
                )}
              </div>

              {user ? (
                <div className="relative">
                  <div className="flex items-center gap-1">
                    {user?.email?.slice(0, 3) + "..."}
                    <HiOutlineUser
                      onMouseEnter={() => setLoggedUserPanel(true)}
                      className="h-10 w-10 cursor-pointer rounded-full border border-my-yellow bg-my-yellow p-2.5 
                        text-white transition-all hover:bg-white hover:text-my-yellow"
                    />
                  </div>
                  {loggedUserPanel && (
                    <div
                      onMouseLeave={() => setLoggedUserPanel(false)}
                      className="absolute right-0 top-20 min-w-[16rem] rounded-xl border bg-white p-6 xl:p-10"
                    >
                      <ul className="flex flex-col items-center gap-3">
                        <li className="inline-flex items-center gap-2 uppercase text-gray-700 transition-all hover:text-black">
                          Konto <MdManageAccounts className="text-xl" />
                        </li>
                        <li>
                          <Link
                            href="/zamowienia"
                            className="inline-flex items-center gap-2  uppercase text-gray-700 transition-all hover:text-black"
                          >
                            Zamówienia <TfiPackage />
                          </Link>
                        </li>
                        <li
                          onClick={() => {
                            signOut(auth);
                            toast.success("Wylogowano 👋🏽");
                          }}
                          className="inline-flex cursor-pointer items-center gap-2 uppercase text-gray-700 transition-all hover:text-black"
                        >
                          Wyloguj się <AiOutlineLogout className="text-xl" />
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="cursor-pointer"
                  onClick={() => setUserPanel(true)}
                >
                  <HiOutlineUser
                    className="h-10 w-10 rounded-full border border-my-yellow bg-my-yellow p-2.5 text-white 
              transition-all hover:bg-white hover:text-my-yellow"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <UserPanel userPanel={userPanel} setUserPanel={setUserPanel} />
    </>
  );
}
