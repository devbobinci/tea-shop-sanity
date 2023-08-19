"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getDatabase, ref, push } from "firebase/database";
import { auth } from "../utilities/firebase";

import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/StateContext";
import { useUserPanelContext } from "../context/UserPanelContext";
import getStripe from "@/lib/getStripe";
import { fetchProducts } from "@/lib/fetchProducts";
import CartItem from "./CartItem";

import { AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { AiOutlineLeft } from "@react-icons/all-files/ai/AiOutlineLeft";
import { AiOutlineShopping } from "@react-icons/all-files/ai/AiOutlineShopping";
import { useAuthState } from "react-firebase-hooks/auth";
import { Product } from "@/typings";

type CartItemProps = {
  id: number;
  quantity: number;
};

export default function ShoppingCart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState(false);

  const [user] = useAuthState(auth);

  const { isOpen, closeCart, cartItems, cartQuantity } = useShoppingCart();

  const { setUserPanel } = useUserPanelContext();

  async function getItem() {
    const products = await fetchProducts();
    setProducts(products);
  }
  useEffect(() => {
    getItem();
  }, []);

  function updateUserPurchase(userId: string) {
    const db = getDatabase();
    const ordersRef = ref(db, `users/${userId}/orders`);

    const order = cartItems.map((item: any) => ({
      price: item.price,
      name: item.title,
      quantity: item.quantity,
      purchase_date: new Date().toLocaleString(),
      mainImage: item.mainImage,
      slug: item.slug,
    }));

    push(ordersRef, order);
  }

  const handleCheckout = async () => {
    setLoader(true);

    const response = await fetch("/api/getStripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (!response.ok) {
      setLoader(false);
    }

    let stripe;

    try {
      toast.loading("Przekierowywanie...");
      const data = await response.json();
      stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId: data.id });
      updateUserPurchase(user?.uid!);
    } catch (error) {
      setLoader(false);
      throw new Error("Nie udało sie kupić, try again");
    }
  };

  return (
    <AnimatePresence>
      <div
        className={`${
          isOpen &&
          "fixed bottom-0 right-0 z-10 flex h-full w-full items-end bg-black/30 transition-all md:right-0 md:top-0 md:block"
        }`}
      >
        <div
          className={`
          ${isOpen ? "show-menu" : "hide-menu"}
          fixed bottom-0 h-[80%] w-full bg-white/90 px-4 py-8 transition-all duration-500 md:h-full md:w-[70%] lg:w-[60%] xl:px-8 2xl:w-[50%]`}
        >
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 bg-transparent pb-2 font-semibold"
            onClick={closeCart}
          >
            <AiOutlineLeft />
            <span className="text-xl font-semibold md:text-2xl">Koszyk</span>
            <span className="cart-num-items">({cartQuantity} rzeczy)</span>
          </button>

          {cartItems.length < 1 && (
            <div className="text-center">
              <div className="my-8 flex justify-center">
                <AiOutlineShopping size={150} />
              </div>
              <h3 className="text-lg font-bold md:text-xl">
                Twój koszyk jest pusty
              </h3>
              <Link href="/product">
                <button
                  type="button"
                  className="text-sm md:text-base"
                  onClick={closeCart}
                >
                  Kontynuuj zakupy
                </button>
              </Link>
            </div>
          )}

          <div className="h-[70%] overflow-y-auto md:h-[85%]">
            {cartItems?.map((item: CartItemProps) => (
              <div key={item.id}>
                <CartItem itemId={item.id} item={item} products={products} />
              </div>
            ))}
          </div>

          {cartItems.length >= 1 && (
            <div className="mx-auto my-3 max-w-md">
              <div className="flex justify-between text-xl">
                <h3 className="font-semibold">Razem:</h3>
                <span className="font-semibold">
                  {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                      const item = products.find(
                        (product) => product._id === cartItem.id
                      );
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0)
                  )}
                </span>
              </div>

              <div className="mt-2 flex justify-center">
                {user ? (
                  <button
                    type="button"
                    className="h-12 w-full rounded-xl bg-my-yellow px-6 py-3 text-center font-semibold text-white hover:text-black"
                    onClick={handleCheckout}
                    disabled={loader}
                  >
                    <ClipLoader loading={loader} size={25} />
                    {!loader && "Sfinalizuj zamówienie"}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setUserPanel(true);
                      closeCart();
                    }}
                    type="button"
                    className="h-12 w-full rounded-xl bg-my-yellow px-6 py-3 text-center font-semibold text-white hover:text-black"
                    disabled={loader}
                  >
                    Zaloguj się
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
