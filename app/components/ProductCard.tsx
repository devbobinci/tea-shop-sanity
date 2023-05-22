"use client";

import product from "@/schemas/product";
import Image from "next/image";
import Link from "next/link";

import urlFor from "../../lib/urlFor";
import { useShoppingCart } from "../context/StateContext";

type Props = {
  product: Product;
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
}: Props) {
  const { increaseCartQuantity } = useShoppingCart();

  const discount = 100 - Number((newPrice / price).toFixed(2).slice(2));

  return (
    <div className="group rounded-md shadow-md">
      <Link href={`/product/${slug.current}`}>
        <div className="relative flex h-72 items-center justify-center rounded-t-md bg-my-beige/20">
          <Image
            src={urlFor(mainImage?.asset).url()!}
            width={200}
            height={200}
            alt="Tea"
            className="h-60 w-60 object-contain pt-4 transition-all group-hover:h-64 group-hover:w-64"
          />
          {newPrice && (
            <span className="absolute right-4 top-4 rounded-md bg-my-yellow px-2 py-1 text-xs font-semibold transition-all group-hover:text-sm">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="rounded-md bg-white p-4 pb-0">
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
            {packageSize.map((size) => (
              <div
                key={size}
                className="cursor-pointer rounded-md border border-my-gray/30 bg-white px-2 py-1 text-sm font-semibold text-my-gray hover:border-my-d-gray hover:text-my-d-gray"
              >
                {size} grams
              </div>
            ))}
          </div>
        </div>
      </Link>
      {/* Cena */}
      <div className="mt-6 flex justify-between border-t-2 border-my-gray/20 p-4">
        <h4 className="text-lg font-semibold text-my-d-gray">
          {newPrice ? newPrice : price}zł{" "}
          {newPrice && (
            <span className="ml-1 text-sm text-[#555] line-through">
              {price}zł
            </span>
          )}
        </h4>
        {availability ? (
          <button
            onClick={() => increaseCartQuantity(_id, product)}
            className={`text-xs font-bold uppercase md:text-xs ${
              availability
                ? "text-my-beige"
                : "pointer-events-none cursor-not-allowed text-my-gray"
            }`}
          >
            Add to cart
          </button>
        ) : (
          <button
            className={`text-xs font-bold uppercase md:text-xs ${"pointer-events-none cursor-not-allowed text-my-gray"}`}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
