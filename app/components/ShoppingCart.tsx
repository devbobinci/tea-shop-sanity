"use client";

import getStripe from "@/lib/getStripe";
import { getProducts } from "@/lib/sanity-db";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { useShoppingCart } from "../context/StateContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartItem from "./CartItem";
import { motion as m } from "framer-motion";

type CartItemProps = {
  id: number;
  quantity: number;
};

export default function ShoppingCart() {
  const cartRef = useRef();
  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState(false);

  const { isOpen, closeCart, cartItems, cartQuantity } = useShoppingCart();

  async function getItem() {
    const products = await getProducts();
    setProducts(products);
  }
  useEffect(() => {
    getItem();
  }, []);

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
      toast.loading("Redirecting...");
      const data = await response.json();
      stripe = await getStripe();
      stripe!.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      setLoader(false);
      throw new Error("Nie udało sie kupić, try again");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="cart-wrapper fixed bottom-0 left-0 z-10 flex h-full w-full items-end bg-black/30 md:right-0 md:top-0 md:block"
          ref={cartRef.current}
        >
          <div className="relative h-[80%] w-full bg-white/80 px-4 py-8 md:float-right md:h-full md:w-[70%] lg:w-[60%] xl:px-8 2xl:w-[50%]">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 bg-transparent pb-2 font-semibold"
              onClick={closeCart}
            >
              <AiOutlineLeft />
              <span className="text-2xl font-semibold">Koszyk</span>
              <span className="cart-num-items">({cartQuantity} rzeczy)</span>
            </button>

            {cartItems.length < 1 && (
              <div className="text-center">
                <div className="my-8 flex justify-center">
                  <AiOutlineShopping size={150} />
                </div>
                <h3 className="text-xl font-bold">Twój koszyk jest pusty</h3>
                <Link href="#products">
                  <button type="button" onClick={closeCart} className="btn">
                    Kontynuuj zakupy
                  </button>
                </Link>
              </div>
            )}

            <div className="h-[80%] overflow-y-auto">
              {cartItems?.map((item: CartItemProps) => (
                <div key={item.id}>
                  <CartItem itemId={item.id} item={item} products={products} />
                </div>
              ))}
            </div>

            {cartItems.length >= 1 && (
              <div className="cart-bottom mx-auto  max-w-md pt-2">
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

                <div className="my-4 flex justify-center">
                  <button
                    type="button"
                    className="h-12 w-full rounded-xl bg-my-yellow px-6 py-3 text-center font-semibold text-white hover:text-black"
                    onClick={handleCheckout}
                  >
                    <ClipLoader loading={loader} size={25} />
                    {!loader && "Sfinalizuj zamówienie"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
