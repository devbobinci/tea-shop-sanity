"use client";

import getStripe from "@/lib/getStripe";
import { getProducts } from "@/lib/sanity-db";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { useShoppingCart } from "../context/StateContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartItem from "./CartItem";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

type CartItemProps = {
  id: number;
  quantity: number;
};

export function ShoppingCart() {
  const cartRef = useRef();
  const [products, setProducts] = useState<Product[]>([]);

  const { isOpen, closeCart, cartItems, cartQuantity } = useShoppingCart();

  async function getItem() {
    const products = await getProducts();
    setProducts(products);
  }
  useEffect(() => {
    getItem();
  }, []);

  const handleCheckout = async () => {
    const response = await fetch("/api/getStripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (!response.ok) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    const stripe = await getStripe();

    stripe!.redirectToCheckout({ sessionId: data.id });
  };

  console.log(cartItems);

  return (
    <>
      {isOpen && (
        <div
          className="cart-wrapper fixed right-0 top-0 z-10 h-full w-full bg-black/30 transition-all"
          ref={cartRef.current}
        >
          <div className="cart-container relative float-right h-full w-[70%] bg-white/50 px-8 py-8 backdrop-blur-md lg:w-[50%]">
            <button
              type="button"
              className="ml-2 flex cursor-pointer items-center gap-2 bg-transparent font-semibold"
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
                <Link href="/">
                  <button type="button" onClick={closeCart} className="btn">
                    Kontynuuj zakupy
                  </button>
                </Link>
              </div>
            )}

            <div className="">
              {cartItems?.map((item: CartItemProps) => (
                <div key={item.id}>
                  <CartItem itemId={item.id} item={item} products={products} />
                </div>
              ))}
            </div>

            {cartItems.length >= 1 && (
              <div className="cart-bottom">
                <div className="flex justify-between text-xl">
                  <h3>Razem:</h3>
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

                <div className="my-8">
                  <button
                    type="button"
                    className="w-full rounded-xl bg-my-yellow px-6 py-3 font-semibold text-white"
                    onClick={handleCheckout}
                  >
                    Sfinalizuj zamówienie
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
