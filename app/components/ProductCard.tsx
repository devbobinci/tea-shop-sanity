"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import urlFor from "../../lib/urlFor";
import { useShoppingCart } from "../context/StateContext";

import { BiCart } from "@react-icons/all-files//bi/BiCart";
import { motion as m } from "framer-motion";
import toast from "react-hot-toast";
import { Product } from "@/typings";

type Props = {
  product: Product;
  productIndex?: number;
};

export default function ProductCard({
  product: {
    title,
    category,
    mainImage,
    description,
    packageSize,
    price,
    newPrice,
    availability,
    slug,
    _id,
  },
  product,
  productIndex,
}: Props) {
  const { increaseCartQuantity, getItemQuantity, cartItems, openCart } =
    useShoppingCart();

  const [inCart, setInCart] = useState(0);

  const productInCart = cartItems.find((item) => item.id === inCart);
  const quantity = getItemQuantity(_id);

  const discount = 100 - Number((newPrice / price).toFixed(2).slice(2));

  return (
    <m.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: productIndex! / 3 }}
      className="group rounded-md bg-white shadow-md"
    >
      <Link href={`/product/${slug?.current}`}>
        <div className="relative flex h-56 items-center justify-center rounded-t-md bg-my-beige/20 md:h-72">
          <Image
            src={urlFor(mainImage?.asset).url()!}
            width={200}
            height={200}
            alt="Tea"
            className="h-60 w-60 object-contain pt-4 transition-all group-hover:h-64 group-hover:w-64"
          />
        </div>
        <div className="rounded-md bg-white p-4">
          <div className="flex items-center justify-between">
            <h5 className="w-fit rounded-sm bg-my-beige/10 px-2 py-1 text-xs font-semibold uppercase text-my-beige">
              {category}
            </h5>
            {!availability && (
              <span className="rounded-md px-2 py-1 text-xs font-bold uppercase text-my-gray">
                Out of Stock
              </span>
            )}
          </div>
          <div className="py-2">
            <h3 className="text-lg font-bold transition-all group-hover:underline">
              {title}
            </h3>
            <p className="line-clamp-1 text-xs font-semibold text-my-gray">
              {description}
            </p>
          </div>
          {/* Rozmiary paczek */}
          <div className="flex gap-1">
            {packageSize &&
              packageSize.map((size) => (
                <div
                  key={size}
                  className="cursor-pointer rounded-md border border-my-gray/30 bg-white px-2 py-1 text-xs font-semibold text-my-gray hover:border-my-d-gray hover:text-my-d-gray"
                >
                  {size} grams
                </div>
              ))}
          </div>
        </div>
      </Link>
      {/* Cena */}
      <div className="flex justify-between rounded-b-md border-t-2 border-my-gray/20 bg-white p-4 py-4">
        <h4 className="text-lg font-semibold text-my-d-gray">{price}zł</h4>
        {availability ? (
          <button
            onClick={() => {
              increaseCartQuantity(_id, product);
              toast.success(`${product?.title} dodano do koszyka`);
              setInCart(_id);
              openCart();
            }}
            className={`text-xs font-bold uppercase md:text-xs ${
              availability
                ? "text-my-beige"
                : "pointer-events-none cursor-not-allowed text-my-gray"
            }`}
          >
            {productInCart ? (
              <span className="inline-flex items-center gap-1">
                W koszyku {`(${quantity})`}{" "}
                <BiCart className="text-xl text-my-beige" />
              </span>
            ) : (
              "Dodaj do koszyka"
            )}
          </button>
        ) : (
          <button
            className={`text-xs font-bold uppercase md:text-xs ${"pointer-events-none cursor-not-allowed text-my-gray"}`}
          >
            Dodaj do koszyka
          </button>
        )}
      </div>
    </m.div>
  );
}
