"use client";

import { getProducts } from "@/lib/sanity-db";
import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useShoppingCart } from "../context/StateContext";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  itemId: number;
  item: {
    id: number;
    quantity: number;
  };
  products: Product[];
};

export default function CartItem({ itemId, item, products }: CartItemProps) {
  const {
    removeFromCart,
    cartItems,
    decreaseCartQuantity,
    increaseCartQuantity,
    getItemQuantity,
  } = useShoppingCart();

  if (itemId === null || itemId === undefined) return null;
  const product = products.find((product) => product._id === itemId);
  const quantity = getItemQuantity(product?._id!);

  const cartItemProduct = {
    ...item,
    ...product!,
  };

  return (
    <div className="relative my-8 flex items-center gap-4 xl:gap-8">
      <Link
        href={`/product/${cartItemProduct?.slug?.current}`}
        className="flex items-center justify-center rounded-md bg-white/20"
      >
        {cartItemProduct?.mainImage && (
          <Image
            src={urlFor(cartItemProduct?.mainImage?.asset).url()!}
            width={150}
            height={100}
            className="h-32 w-32 object-contain "
            alt={cartItemProduct?.title!}
          />
        )}
      </Link>

      <div className=" flex flex-1 flex-col justify-between lg:flex-row lg:items-center">
        <div className="">
          {/* title */}
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold md:text-xl">
              {cartItemProduct?.title}
            </h3>
            <div className="text-sm xl:text-base">
              {item?.quantity > 1 && (
                <span className="inline-block">
                  x{cartItemProduct?.quantity}
                </span>
              )}
            </div>
          </div>
          <div className="text-xs text-my-d-gray xl:text-sm">
            {formatCurrency(cartItemProduct?.price!)}
          </div>
        </div>

        <div className="flex flex-col gap-0 md:flex-row md:items-center md:gap-2">
          <p className="my-2 flex h-fit w-fit items-center gap-4 rounded-full bg-white/20 px-4 py-2 shadow-md lg:mx-2 lg:my-0  2xl:flex-row">
            <span
              onClick={() =>
                decreaseCartQuantity(cartItemProduct?._id!, cartItemProduct)
              }
              className="minus cursor-pointer text-base font-semibold text-red-500 hover:scale-125 xl:text-lg"
            >
              <AiOutlineMinus />
            </span>
            <span className="num text-base font-semibold xl:text-lg">
              {quantity}
            </span>
            <span
              onClick={() =>
                increaseCartQuantity(cartItemProduct?._id!, cartItemProduct)
              }
              className="plus cursor-pointer text-base font-semibold text-emerald-500 hover:scale-125 xl:text-lg"
            >
              <AiOutlinePlus />
            </span>
          </p>

          <div className="text-base font-semibold xl:text-lg">
            {formatCurrency(
              cartItemProduct?.price! * cartItemProduct?.quantity!
            )}
          </div>
          <button
            className="remove-item right-0 h-10 w-8 rounded-md text-2xl text-my-red lg:static lg:translate-y-0"
            onClick={() => removeFromCart(itemId)}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
