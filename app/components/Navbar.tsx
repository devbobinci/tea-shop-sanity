"use client";

import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useShoppingCart } from "../context/StateContext";
import { useUserPanelContext } from "../context/UserPanelContext";
import UserPanel from "./UserPanel";
import { DesktopNavLinks, MobileNavLinks } from "./NavLinks";

import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import { HiOutlineMenuAlt2 } from "@react-icons/all-files/hi/HiOutlineMenuAlt2";
import { HiOutlineUser } from "@react-icons/all-files/hi/HiOutlineUser";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import { VscPackage } from "@react-icons/all-files/vsc/VscPackage";
import toast from "react-hot-toast";
import { motion as m } from "framer-motion";

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
              className="flex flex-row-reverse items-center gap-4"
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
                      onClick={() => setLoggedUserPanel(true)}
                      className="h-10 w-10 cursor-pointer rounded-full border border-my-yellow bg-my-yellow p-2.5 
                        text-white transition-all hover:bg-white hover:text-my-yellow"
                    />
                  </div>
                  {loggedUserPanel && (
                    <m.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, bounce: 10 }}
                      className="absolute right-0 top-16 min-w-full rounded-xl border bg-white p-6 md:min-w-[16rem] xl:p-10"
                    >
                      <IoMdClose
                        onClick={() => setLoggedUserPanel(false)}
                        className="absolute -right-2 -top-2 h-6 w-6 cursor-pointer rounded-full border bg-white p-1 text-xl transition-all hover:h-7 hover:w-7"
                      />
                      <ul className="flex flex-col items-center gap-3">
                        <li onClick={() => setLoggedUserPanel(false)}>
                          <Link
                            href="/zamowienia"
                            className="inline-flex items-center gap-2 text-sm uppercase text-gray-700 transition-all hover:text-black md:text-base"
                          >
                            Zamówienia <VscPackage className="text-2xl" />
                          </Link>
                        </li>
                        <li
                          onClick={() => {
                            signOut(auth);
                            toast.success("Wylogowano 👋🏽");
                            setLoggedUserPanel(false);
                          }}
                          className="inline-flex cursor-pointer items-center gap-2 text-sm uppercase text-gray-700 transition-all hover:text-black md:text-base"
                        >
                          Wyloguj się <AiOutlineLogout className="text-xl" />
                        </li>
                      </ul>
                    </m.div>
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
